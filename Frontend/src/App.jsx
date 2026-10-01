
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

import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import CreateEvent from "./pages/organizer/CreateEvent";
import ManageEvents from "./pages/organizer/ManageEvents";
import Attendees from "./pages/organizer/Attendees";

import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  const location = useLocation();

  // Hide Navbar on Login and Register pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  // Hide Footer on Login and Register pages
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app">

      {/* NAVBAR */}
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>

          {/* ========================================
              PUBLIC PAGES
          ======================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/events"
            element={<Events />}
          />

          <Route
            path="/events/:id"
            element={<EventDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* ========================================
              LOGGED-IN USER PAGES
          ======================================== */}

          <Route element={<ProtectedRoute />}>

            {/* User Home */}
            <Route
              path="/home"
              element={<UserHome />}
            />

            {/* Booking */}
            <Route
              path="/booking/:id"
              element={<Booking />}
            />

            {/* My Bookings */}
            <Route
              path="/my-bookings"
              element={<MyBookings />}
            />

            {/* Profile */}
            <Route
              path="/profile"
              element={<Profile />}
            />

          </Route>


          {/* ========================================
              ORGANIZER PAGES
          ======================================== */}

          <Route
            element={
              <ProtectedRoute roles={["organizer"]} />
            }
          >

            <Route
              path="/organizer"
              element={<OrganizerDashboard />}
            />

            <Route
              path="/organizer/create"
              element={<CreateEvent />}
            />

            <Route
              path="/organizer/manage"
              element={<ManageEvents />}
            />

            <Route
              path="/organizer/attendees"
              element={<Attendees />}
            />

          </Route>


          {/* ========================================
              ADMIN PAGES
          ======================================== */}

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


          {/* ========================================
              FALLBACK
          ======================================== */}

          <Route
            path="*"
            element={<Home />}
          />

        </Routes>
      </main>


      {/* FOOTER */}
      {!hideFooter && <Footer />}

    </div>
  );
}

export default App;

