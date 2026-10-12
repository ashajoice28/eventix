import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
const gold = "#d4af37";
const fallback = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80";
export default function EventDetails() {
  const { id } = useParams(); const { user } = useAuth();
  const [event, setEvent] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { api.get(`/events/${id}`).then(({ data }) => setEvent(data.event)).catch((e) => setError(e.response?.data?.message || "Event could not be loaded.")).finally(() => setLoading(false)); }, [id]);
  if (loading) return <div style={page}>Loading event…</div>;
  if (error || !event) return <div style={page}><h2>{error || "Event not found"}</h2><Link to="/events">Back to events</Link></div>;
  return <main style={page}><div style={{ maxWidth: 1100, margin: "0 auto" }}><Link to="/events" style={{ color: gold }}>← All events</Link><img src={event.banner || fallback} alt={event.title} style={{ width: "100%", height: "clamp(220px,40vw,440px)", objectFit: "cover", borderRadius: 20, margin: "22px 0" }} onError={(e) => e.currentTarget.src = fallback}/><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 28 }}><section><p style={{ color: gold, letterSpacing: 3 }}>{event.category}</p><h1 style={{ fontSize: 42, margin: "10px 0" }}>{event.title}</h1><p style={{ color: "#bbb", lineHeight: 1.8 }}>{event.description}</p><p>📍 {event.venue}, {event.city}</p><p>📅 {new Date(event.date).toLocaleDateString("en-IN", { dateStyle: "full" })} · {event.time}</p></section><aside style={{ border: "1px solid #3b3320", background: "#111", borderRadius: 18, padding: 24, alignSelf: "start" }}><p style={{ color: "#aaa" }}>Ticket price</p><h2 style={{ fontSize: 34, color: gold }}>{Number(event.price) === 0 ? "Free" : `₹${Number(event.price).toLocaleString("en-IN")}`}</h2><p>{event.availableSeats} seats available</p>{user?.role === "attendee" ? <Link style={button} to={`/booking/${event._id}`}>Book tickets</Link> : <Link style={button} to="/login">Login to book</Link>}</aside></div></div></main>;
}
const page = { minHeight: "100vh", background: "#080808", color: "#f7f4ed", padding: "30px clamp(16px,5vw,72px) 70px" };
const button = { display: "inline-block", textAlign: "center", background: gold, color: "#080808", textDecoration: "none", padding: "13px 18px", borderRadius: 10, fontWeight: 800, marginTop: 16 };
