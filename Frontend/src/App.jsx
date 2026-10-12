import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import UserHome from "./pages/UserHome";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Favorites from "./pages/Favorites";

/* =========================
   ORGANIZER
========================= */

import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import CreateEvent from "./pages/organizer/CreateEvent";
import ManageEvents from "./pages/organizer/ManageEvents";
import EditEvent from "./pages/organizer/EditEvent";
import Attendees from "./pages/organizer/Attendees";
import TicketScanner from "./pages/organizer/TicketScanner";
import OrganizerAnalytics from "./pages/organizer/OrganizerAnalytics";

/* =========================
   ADMIN
========================= */

import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  const location = useLocation();

  /* =========================
     HIDE NAVBAR ON AUTH PAGES
  ========================= */

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================= */}

      {!hideNavbar && <Navbar />}

      <main>
        <Routes>

          {/* =========================
              PUBLIC HOME
          ========================= */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* =========================
              ALL EVENTS
          ========================= */}

          <Route
            path="/events"
            element={<Events />}
          />

          {/* =========================
              EVENT DETAILS
          ========================= */}

          <Route
            path="/events/:id"
            element={<EventDetails />}
          />

          {/* =========================
              LOGIN
          ========================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* =========================
              REGISTER
          ========================= */}

          <Route
            path="/register"
            element={<Register />}
          />

          {/* =========================
              LOGGED-IN USER ROUTES
          ========================= */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/home"
              element={<UserHome />}
            />

            <Route
              path="/booking/:id"
              element={<Booking />}
            />

            <Route
              path="/my-bookings"
              element={<MyBookings />}
            />

            <Route
              path="/favorites"
              element={<Favorites />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/payment"
              element={<Payment />}
            />

          </Route>

          {/* =========================
              ORGANIZER ROUTES
          ========================= */}

          <Route
            element={
              <ProtectedRoute roles={["organizer"]} />
            }
          >

            {/* ORGANIZER DASHBOARD */}

            <Route
              path="/organizer"
              element={<OrganizerDashboard />}
            />

            {/* CREATE EVENT */}

            <Route
              path="/organizer/create"
              element={<CreateEvent />}
            />

            {/* MANAGE EVENTS */}

           <Route
  path="/organizer/manage-events"
  element={<ManageEvents />}
/> 

            {/* EDIT EVENT */}

            <Route
  path="/organizer/edit/:id"
  element={<EditEvent />}
/>

            {/* ATTENDEES */}

            <Route
              path="/organizer/attendees"
              element={<Attendees />}
            />

            <Route
              path="/organizer/analytics"
              element={<OrganizerAnalytics />}
            />

            {/* QR TICKET SCANNER */}

            <Route
              path="/organizer/scanner"
              element={<TicketScanner />}
            />

          </Route>

          {/* =========================
              ADMIN ROUTES
          ========================= */}

          <Route
            element={
              <ProtectedRoute roles={["admin"]} />
            }
          >

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

          </Route>

          {/* =========================
              FALLBACK
          ========================= */}

          <Route
            path="*"
            element={<Home />}
          />

        </Routes>
      </main>

      {/* =========================
          FOOTER ONLY ON PUBLIC HOME
      ========================= */}

      {location.pathname === "/" && <Footer />}

    </div>
  );
}

export default App;