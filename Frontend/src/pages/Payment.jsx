import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
const gold = "#d4af37";
export default function Payment() {
  const { state } = useLocation(); const navigate = useNavigate();
  const [event, setEvent] = useState(null); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  useEffect(() => { if (state?.eventId) api.get(`/events/${state.eventId}`).then(({ data }) => setEvent(data.event)).catch(() => setError("Could not load the selected event.")); }, [state?.eventId]);
  if (!state?.eventId) return <main style={page}><section style={card}><h1>No payment session found</h1><p>Choose an event before continuing to payment.</p><Link to="/events" style={button}>Browse events</Link></section></main>;
  const pay = async () => {
    setBusy(true); setError(""); let order;
    try {
      const scriptLoaded = await new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement("script"); script.src = "https://checkout.razorpay.com/v1/checkout.js"; script.onload = () => resolve(true); script.onerror = () => resolve(false); document.body.appendChild(script);
      });
      if (!scriptLoaded) throw new Error("Unable to load secure checkout. Check your internet connection.");
      const { data } = await api.post("/payments/create-order", { eventId: state.eventId, tickets: Number(state.tickets) || 1 });
      order = data;
      const checkout = new window.Razorpay({
        key: data.keyId, amount: data.amount, currency: data.currency, name: "Eventix", description: data.event?.title || "Event tickets", order_id: data.orderId,
        prefill: data.prefill, theme: { color: gold },
        handler: async (response) => {
          try { await api.post("/payments/verify", { ...response, bookingId: data.bookingId }); navigate("/my-bookings", { replace: true, state: { paymentSuccess: true } }); }
          catch (e) { setError(e.response?.data?.message || "Payment was received but verification needs attention. Contact support with your payment ID: " + response.razorpay_payment_id); setBusy(false); }
        },
        modal: { ondismiss: async () => { try { await api.post(`/payments/cancel/${data.bookingId}`); } catch {} setBusy(false); } },
      });
      checkout.on("payment.failed", async (response) => { setError(response.error?.description || "Payment failed. Please try again."); try { await api.post(`/payments/cancel/${data.bookingId}`); } catch {} setBusy(false); });
      checkout.open();
    } catch (e) { setError(e.response?.data?.message || e.message || "Unable to start payment."); setBusy(false); }
  };
  return <main style={page}><div style={{ maxWidth: 780, margin: "0 auto" }}><Link to={`/booking/${state.eventId}`} style={{ color: gold }}>← Back to booking</Link><section style={card}><p style={{ color: gold, letterSpacing: 3, fontSize: 12 }}>SECURE CHECKOUT</p><h1 style={{ fontSize: 32 }}>Complete your booking</h1><p style={{ color: "#aaa" }}>Payments are handled by Razorpay. Your ticket is saved as confirmed only after payment signature verification on the server.</p>{event && <div style={{ background: "#080808", border: "1px solid #29251a", padding: 18, borderRadius: 12, margin: "22px 0" }}><h2>{event.title}</h2><p style={{ color: "#aaa" }}>{event.venue}, {event.city}</p><div style={{ display: "flex", justifyContent: "space-between", marginTop: 18 }}><span>{state.tickets} × ₹{Number(event.price).toLocaleString("en-IN")}</span><strong style={{ color: gold, fontSize: 22 }}>₹{(Number(event.price) * Number(state.tickets)).toLocaleString("en-IN")}</strong></div></div>}{error && <p role="alert" style={{ background: "#351919", color: "#ffaaaa", padding: 13, borderRadius: 9 }}>{error}</p>}<button disabled={busy || !event} onClick={pay} style={{ ...button, opacity: busy || !event ? .65 : 1 }}>{busy ? "Preparing secure checkout…" : "Pay securely with Razorpay"}</button><p style={{ color: "#777", fontSize: 12, marginTop: 16 }}>For testing, configure Razorpay test API keys in Backend/.env. Never place the key secret in frontend code.</p></section></div></main>;
}
const page = { minHeight: "100vh", background: "#080808", color: "#f7f4ed", padding: "32px 18px 70px" };
const card = { background: "#111", border: "1px solid #3b3320", borderRadius: 18, padding: "clamp(20px,5vw,36px)", marginTop: 20 };
const button = { width: "100%", display: "inline-block", textAlign: "center", padding: 15, border: 0, borderRadius: 10, background: gold, color: "#080808", textDecoration: "none", fontWeight: 800, cursor: "pointer" };
