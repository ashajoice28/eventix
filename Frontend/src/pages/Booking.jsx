import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
const gold = "#d4af37";
export default function Booking() {
  const { id } = useParams(); const navigate = useNavigate(); const { user } = useAuth();
  const [event, setEvent] = useState(null); const [tickets, setTickets] = useState(1); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { api.get(`/events/${id}`).then(({ data }) => setEvent(data.event)).catch((e) => setError(e.response?.data?.message || "Could not load event.")).finally(() => setLoading(false)); }, [id]);
  if (loading) return <div style={page}>Loading booking details…</div>;
  if (!event) return <div style={page}><h2>{error || "Event not found"}</h2><Link to="/events">Browse events</Link></div>;
  if (user?.role !== "attendee") return <div style={page}><h2>Attendee account required</h2><p>Log in with an attendee account to book tickets.</p><Link to="/login" style={button}>Login</Link></div>;
  const total = Number(event.price) * tickets;
  const submit = async () => {
    if (tickets < 1 || tickets > Math.min(10, event.availableSeats)) return setError("Choose a valid ticket quantity.");
    setError("");
    if (total === 0) {
      try { await api.post("/bookings", { eventId: event._id, numberOfTickets: tickets }); navigate("/my-bookings", { replace: true, state: { paymentSuccess: true } }); }
      catch (e) { setError(e.response?.data?.message || "Could not reserve your free tickets."); }
      return;
    }
    navigate("/payment", { state: { eventId: event._id, tickets } });
  };
  return <main style={page}><div style={{ maxWidth: 900, margin: "0 auto" }}><Link to={`/events/${event._id}`} style={{ color: gold }}>← Event details</Link><h1 style={{ fontSize: 36, margin: "18px 0" }}>Book your tickets</h1><section style={card}><h2>{event.title}</h2><p style={muted}>📍 {event.venue}, {event.city}</p><p style={muted}>📅 {new Date(event.date).toLocaleDateString("en-IN", { dateStyle: "long" })} · {event.time}</p><hr style={divider}/><label htmlFor="ticket-count" style={{ display: "block", marginBottom: 10 }}>Number of tickets</label><select id="ticket-count" value={tickets} onChange={(e) => { setTickets(Number(e.target.value)); setError(""); }} style={input}>{Array.from({ length: Math.max(1, Math.min(10, event.availableSeats)) }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? "ticket" : "tickets"}</option>)}</select><div style={{ display: "flex", justifyContent: "space-between", margin: "24px 0" }}><span style={muted}>Ticket price × {tickets}</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 23, borderTop: "1px solid #3b3320", paddingTop: 18 }}><strong>Total</strong><strong style={{ color: gold }}>{total === 0 ? "Free" : `₹${total.toLocaleString("en-IN")}`}</strong></div>{error && <p role="alert" style={{ color: "#ff8585" }}>{error}</p>}<button onClick={submit} style={button} disabled={event.availableSeats < 1}>{total === 0 ? "Continue to reserve" : "Continue to secure payment"}</button><p style={{ color: "#888", fontSize: 12, marginTop: 14 }}>Your ticket is confirmed only after the server verifies payment.</p></section></div></main>;
}
const page = { minHeight: "100vh", background: "#080808", color: "#f7f4ed", padding: "32px 18px 70px" };
const card = { maxWidth: 650, background: "#111", border: "1px solid #3b3320", borderRadius: 18, padding: "clamp(20px,5vw,36px)", marginTop: 20 };
const muted = { color: "#aaa" }; const divider = { border: 0, borderTop: "1px solid #29251a", margin: "22px 0" };
const input = { width: "100%", padding: 13, background: "#080808", border: "1px solid #48402a", borderRadius: 9, color: "white" };
const button = { width: "100%", padding: 14, marginTop: 18, border: 0, borderRadius: 10, background: gold, color: "#080808", fontWeight: 800, cursor: "pointer" };
