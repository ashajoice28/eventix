import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
const gold = "#d4af37";
export default function OrganizerAnalytics() {
 const [events,setEvents]=useState([]);const [error,setError]=useState("");
 useEffect(()=>{api.get("/events/organizer/my-events").then(({data})=>setEvents(data.events||[])).catch(e=>setError(e.response?.data?.message||"Unable to load analytics."));},[]);
 const stats=useMemo(()=>events.reduce((s,e)=>({events:s.events+1,total:s.total+Number(e.totalSeats||0),available:s.available+Number(e.availableSeats||0)}),{events:0,total:0,available:0}),[events]);
 return <main style={page}><div style={{maxWidth:1050,margin:"0 auto"}}><Link to="/organizer" style={{color:gold}}>← Dashboard</Link><h1 style={{fontSize:38,margin:"18px 0"}}>Event analytics</h1><p style={{color:"#aaa"}}>Live event and ticket inventory totals from MongoDB. Revenue is shown only for verified payments.</p>{error&&<p style={{color:"#ff9b9b"}}>{error}</p>}<div style={grid}>{[["Events",stats.events],["Ticket capacity",stats.total],["Tickets available",stats.available],["Tickets sold/reserved",stats.total-stats.available]].map(([l,v])=><div key={l} style={card}><p style={{color:"#aaa"}}>{l}</p><h2 style={{fontSize:32,color:gold,marginTop:8}}>{v}</h2></div>)}</div><h2 style={{margin:"28px 0 14px",fontSize:23}}>Event inventory</h2>{events.map(e=><div key={e._id} style={card}><strong>{e.title}</strong><p style={{color:"#aaa",marginTop:8}}>{e.availableSeats} of {e.totalSeats} tickets available</p></div>)}</div></main>;
}
const page={minHeight:"100vh",background:"#080808",color:"#f7f4ed",padding:"32px 18px 70px"};const grid={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginTop:24};const card={background:"#111",border:"1px solid #3b3320",borderRadius:14,padding:20,marginBottom:12};
