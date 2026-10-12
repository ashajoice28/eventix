const crypto = require("crypto");
const Booking = require("../models/Booking");
const Event = require("../models/Event");

const razorpayRequest = async (path, method = "POST", body) => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    const error = new Error("Razorpay test keys are not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to Backend/.env.");
    error.status = 503;
    throw error;
  }
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data?.error?.description || "Razorpay request failed.");
    error.status = response.status;
    throw error;
  }
  return data;
};

exports.createOrder = async (req, res) => {
  let booking;
  try {
    const eventId = req.body.eventId;
    const tickets = Number(req.body.tickets || req.body.numberOfTickets || 1);
    if (!eventId || !Number.isInteger(tickets) || tickets < 1 || tickets > 10) {
      return res.status(400).json({ message: "Choose an event and between 1 and 10 tickets." });
    }
    const event = await Event.findById(eventId);
    if (!event || event.status !== "approved") return res.status(404).json({ message: "Event is not available." });
    if (event.availableSeats < tickets) return res.status(400).json({ message: `Only ${event.availableSeats} tickets remain.` });
    const totalAmount = Math.round(Number(event.price) * tickets * 100) / 100;
    if (totalAmount <= 0) return res.status(400).json({ message: "Free events do not require online payment. Contact support to reserve a free ticket." });

    // Reserve seats atomically before opening checkout.
    const reserved = await Event.findOneAndUpdate(
      { _id: event._id, status: "approved", availableSeats: { $gte: tickets } },
      { $inc: { availableSeats: -tickets } },
      { new: true }
    );
    if (!reserved) return res.status(409).json({ message: "Those tickets were just taken. Please refresh and try again." });

    try {
      const order = await razorpayRequest("/orders", "POST", {
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: `evt_${Date.now()}`,
        notes: { eventId: String(event._id), userId: String(req.user._id) },
      });
      booking = await Booking.create({
        user: req.user._id,
        event: event._id,
        numberOfTickets: tickets,
        totalAmount,
        bookingStatus: "pending",
        paymentStatus: "pending",
        razorpayOrderId: order.id,
      });
      return res.status(201).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        bookingId: booking._id,
        event: { title: event.title, description: event.description },
        prefill: { name: req.user.username, email: req.user.email },
      });
    } catch (error) {
      await Event.findByIdAndUpdate(event._id, { $inc: { availableSeats: tickets } });
      throw error;
    }
  } catch (error) {
    console.error("Create payment order:", error.message);
    return res.status(error.status || 500).json({ message: error.message || "Unable to start payment." });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      return res.status(400).json({ message: "Payment verification details are incomplete." });
    }
    const booking = await Booking.findOne({ _id: bookingId, user: req.user._id, razorpayOrderId: razorpay_order_id });
    if (!booking) return res.status(404).json({ message: "Booking not found for this payment." });
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(String(razorpay_signature));
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return res.status(400).json({ message: "Payment signature verification failed." });
    }
    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";
    booking.razorpayPaymentId = razorpay_payment_id;
    booking.ticketId = booking.ticketId || `EVT-${String(booking._id).slice(-8).toUpperCase()}`;
    await booking.save();
    const populated = await Booking.findById(booking._id).populate("event", "title date time venue city price banner category");
    return res.json({ message: "Payment verified. Your ticket is confirmed.", booking: populated });
  } catch (error) {
    console.error("Verify payment:", error.message);
    return res.status(500).json({ message: "Unable to verify payment." });
  }
};

exports.cancelPending = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id, bookingStatus: "pending" });
    if (!booking) return res.status(404).json({ message: "Pending booking not found." });
    booking.bookingStatus = "cancelled";
    booking.paymentStatus = "failed";
    await booking.save();
    await Event.findByIdAndUpdate(booking.event, { $inc: { availableSeats: booking.numberOfTickets } });
    return res.json({ message: "Payment cancelled; ticket inventory restored." });
  } catch (error) {
    return res.status(500).json({ message: "Unable to cancel pending booking." });
  }
};
