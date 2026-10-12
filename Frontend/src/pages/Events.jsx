import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const gold = "#d4af37";
const fallback = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80";
const categories = ["All", "Music", "Sports", "Workshop", "Festival", "Technology", "Other"];

export default function Events() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/events", { params: { page, search, category } })
      .then(({ data }) => {
        if (!active) return;
        setEvents(Array.isArray(data.events) ? data.events : []);
        setTotal(Number(data.total ?? data.count ?? 0));
        setTotalPages(Number(data.totalPages ?? 0));
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || "Could not load events. Check that the backend and MongoDB are running.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, search, category]);

  useEffect(() => {
    let active = true;
    if (!user) { setFavoriteIds([]); return () => { active = false; }; }
    api.get("/favorites")
      .then(({ data }) => {
        if (active) setFavoriteIds((data.favorites || []).map((event) => String(event._id)));
      })
      .catch(() => {});
    return () => { active = false; };
  }, [user]);

  const toggleFavorite = async (event) => {
    if (!user) {
      navigate("/login", { state: { from: "/events" } });
      return;
    }
    const id = String(event._id);
    try {
      if (favoriteIds.includes(id)) {
        await api.delete(`/favorites/${id}`);
        setFavoriteIds((old) => old.filter((savedId) => savedId !== id));
      } else {
        await api.post(`/favorites/${id}`);
        setFavoriteIds((old) => [...old, id]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not update favorites.");
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <p style={styles.eyebrow}>DISCOVER EXPERIENCES</p>
        <h1 style={styles.heading}>Find your next <span style={{ color: gold }}>great event.</span></h1>
        <p style={styles.subtitle}>Events published by organizers appear here directly from the Eventix database.</p>

        <div style={styles.filters}>
          <input aria-label="Search events" placeholder="Search events, cities or venues" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} style={styles.input} />
          <select aria-label="Filter by category" value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }} style={{ ...styles.input, maxWidth: 220 }}>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        {error && <p role="alert" style={styles.error}>{error}</p>}
        {loading && <p style={{ color: gold }}>Loading events from MongoDB…</p>}
        {!loading && !error && <p style={styles.count}>{total} event{total !== 1 ? "s" : ""} found</p>}
        {!loading && !error && events.length === 0 && (
          <div style={styles.empty}><h2>No events found yet</h2><p>Try another search, or ask an organizer to publish an event.</p></div>
        )}

        <div style={styles.grid}>
          {events.map((event) => {
            const saved = favoriteIds.includes(String(event._id));
            return (
              <article key={event._id} style={styles.card}>
                <img src={event.banner || fallback} alt={event.title} style={styles.image}
                  onError={(e) => { if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback; }} />
                <div style={styles.cardBody}>
                  <div style={styles.cardTop}>
                    <span style={styles.category}>{event.category || "EVENT"}</span>
                    <button aria-label={saved ? "Remove from favorites" : "Add to favorites"}
                      onClick={() => toggleFavorite(event)} style={styles.favorite}>{saved ? "♥ Saved" : "♡ Save"}</button>
                  </div>
                  <h2 style={styles.cardTitle}>{event.title}</h2>
                  <p style={styles.muted}>📍 {event.city || event.venue}{event.city && event.venue ? ` · ${event.venue}` : ""}</p>
                  <p style={styles.muted}>📅 {event.date ? new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Date to be announced"} · {event.time}</p>
                  <div style={styles.cardBottom}>
                    <strong style={styles.price}>{Number(event.price) === 0 ? "Free" : `₹${Number(event.price).toLocaleString("en-IN")}`}</strong>
                    <Link to={`/events/${event._id}`} style={styles.detailsButton}>View details</Link>
                  </div>
                  <p style={styles.seats}>{event.availableSeats} tickets left</p>
                </div>
              </article>
            );
          })}
        </div>

        {!loading && !error && totalPages > 1 && (
          <div style={styles.pagination}>
            <button disabled={page <= 1} onClick={() => setPage((current) => current - 1)} style={styles.pageButton}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} style={styles.pageButton}>Next</button>
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#080808", color: "#f7f4ed", padding: "38px clamp(16px, 5vw, 72px) 70px" },
  container: { maxWidth: 1280, margin: "0 auto" },
  eyebrow: { color: gold, letterSpacing: 4, fontSize: 12, fontWeight: 700 },
  heading: { fontSize: "clamp(30px, 4vw, 48px)", margin: "8px 0" },
  subtitle: { color: "#aaa", marginBottom: 24 },
  filters: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 },
  input: { flex: "1 1 260px", minWidth: 0, padding: "13px 15px", border: "1px solid #48402a", borderRadius: 10, background: "#121212", color: "white", outlineColor: gold },
  count: { color: "#aaa", marginBottom: 18 },
  error: { color: "#ff8585", padding: 16, background: "#241414", borderRadius: 12, marginBottom: 18 },
  empty: { padding: 36, textAlign: "center", border: "1px dashed #514626", borderRadius: 18, color: "#aaa" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,270px),1fr))", gap: 22 },
  card: { overflow: "hidden", border: "1px solid #29251a", borderRadius: 18, background: "#111" },
  image: { width: "100%", height: 185, objectFit: "cover", background: "#222" },
  cardBody: { padding: 18 },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 },
  category: { color: gold, fontSize: 12, fontWeight: 700 },
  favorite: { border: "1px solid #514626", background: "#17140d", color: gold, borderRadius: 8, padding: "7px 10px", cursor: "pointer" },
  cardTitle: { fontSize: 21, margin: "8px 0" },
  muted: { color: "#aaa", fontSize: 14, margin: "6px 0" },
  cardBottom: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, gap: 10 },
  price: { color: gold, fontSize: 21 },
  detailsButton: { display: "inline-block", padding: "10px 14px", borderRadius: 9, background: gold, color: "#080808", textDecoration: "none", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" },
  seats: { color: "#777", fontSize: 12, marginTop: 12 },
  pagination: { display: "flex", justifyContent: "center", alignItems: "center", gap: 18, marginTop: 35 },
  pageButton: { background: gold, color: "#080808", border: 0, borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontWeight: 700 },
};
