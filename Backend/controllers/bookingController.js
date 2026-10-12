const Booking = require("../models/Booking");
const Event = require("../models/Event");

// ==========================================
// CREATE BOOKING
// ==========================================
const createBooking = async (req, res) => {
  try {
    const { eventId, numberOfTickets } = req.body;

    if (!eventId || !numberOfTickets) {
      return res.status(400).json({
        message: "Event ID and number of tickets are required",
      });
    }

    if (!Number.isInteger(Number(numberOfTickets)) || Number(numberOfTickets) < 1 || Number(numberOfTickets) > 10) {
      return res.status(400).json({ message: "Choose between 1 and 10 tickets." });
    }

    // Find event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Only approved events can be booked
    if (event.status !== "approved") {
      return res.status(400).json({ message: "This event is not available for booking" });
    }
    // Paid events must use the verified payment-order flow.
    if (Number(event.price) > 0) {
      return res.status(400).json({ message: "Please use secure checkout to book this paid event." });
    }

    // Check available seats
    if (event.availableSeats < numberOfTickets) {
      return res.status(400).json({
        message: `Only ${event.availableSeats} seats are available`,
      });
    }

    // Calculate total
    const totalAmount = event.price * numberOfTickets;

    // Generate ticket ID
    const ticketId =
      "EVT-" +
      Date.now() +
      "-" +
      Math.random().toString(36).substring(2, 8).toUpperCase();

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
      numberOfTickets,
      totalAmount,
      bookingStatus: "confirmed",
      paymentStatus: "paid",
      ticketId,
    });

    // Reduce available seats
    event.availableSeats -= numberOfTickets;

    await event.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("event", "title date time venue city price banner")
      .populate("user", "username email");

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Server error while creating booking",
    });
  }
};

// ==========================================
// GET MY BOOKINGS
// ==========================================
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate(
        "event",
        "title date time venue city price banner category"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Server error while fetching bookings",
    });
  }
};

// ==========================================
// GET SINGLE BOOKING
// ==========================================
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate(
        "event",
        "title date time venue city price banner category"
      )
      .populate("user", "username email");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // User can only see their own booking
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only view your own booking",
      });
    }

    res.status(200).json({
      booking,
    });
  } catch (error) {
    console.error("Get booking error:", error);

    res.status(500).json({
      message: "Server error while fetching booking",
    });
  }
};

// ==========================================
// CANCEL BOOKING
// ==========================================
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Check ownership
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only cancel your own booking",
      });
    }

    // Already cancelled
    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        message: "Booking is already cancelled",
      });
    }

    // Find event
    const event = await Event.findById(booking.event);

    if (event) {
      // Return seats to event
      event.availableSeats += booking.numberOfTickets;

      // Don't allow available seats to exceed total seats
      if (event.availableSeats > event.totalSeats) {
        event.availableSeats = event.totalSeats;
      }

      await event.save();
    }

    booking.bookingStatus = "cancelled";
    if (booking.paymentStatus === "paid") booking.paymentStatus = "paid";
    else booking.paymentStatus = "failed";

    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error);

    res.status(500).json({
      message: "Server error while cancelling booking",
    });
  }
};

const getOrganizerAttendees = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).select("_id title");
    const eventIds = events.map((event) => event._id);
    const bookings = await Booking.find({ event: { $in: eventIds }, paymentStatus: "paid", bookingStatus: "confirmed" })
      .populate("user", "username email")
      .populate("event", "title date")
      .sort({ createdAt: -1 });
    return res.json({ count: bookings.length, attendees: bookings.map((b) => ({ id: b._id, name: b.user?.username || "Attendee", email: b.user?.email || "", event: b.event?.title || "Event", tickets: b.numberOfTickets, status: b.bookingStatus, ticketId: b.ticketId })) });
  } catch (error) {
    console.error("Organizer attendees error:", error.message);
    return res.status(500).json({ message: "Unable to fetch attendees." });
  }
};

module.exports = {
  getOrganizerAttendees,
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
};