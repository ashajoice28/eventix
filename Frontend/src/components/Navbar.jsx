import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaPlus,
  FaTicketAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import Notificationbell from "./Notificationbell";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  const isPublicHome = location.pathname === "/";
  const isUserHome = location.pathname === "/home";

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const isAuthPage =
    isLoginPage || isRegisterPage;

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* =========================
            LOGO
        ========================= */}

        <Link
          to={user ? "/home" : "/"}
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="logo-icon">
            <FaCalendarAlt />
          </span>

          <span>
            EVENT<span className="gold">IX</span>
          </span>
        </Link>


        {/* =========================
            DESKTOP NAVIGATION
        ========================= */}

        <nav
          className={`navbar-links ${
            menuOpen ? "navbar-mobile-open" : ""
          }`}
        >

          {/* =========================
              LOGIN / REGISTER PAGE
          ========================= */}

          {isAuthPage ? (
            <div className="auth-navbar-links">

              <Link
                to="/"
                className="nav-link"
                onClick={closeMenu}
              >
                Home
              </Link>

              <Link
                to="/login"
                className="nav-link"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="nav-link"
                onClick={closeMenu}
              >
                Register
              </Link>

            </div>
          ) : (

            <>
              {/* =========================
                  HOME + EVENTS
              ========================= */}

              {!isPublicHome && !isUserHome && (
                <>
                  <NavLink
                    to={user ? "/home" : "/"}
                    className={navClass}
                    onClick={closeMenu}
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/events"
                    className={navClass}
                    onClick={closeMenu}
                  >
                    Events
                  </NavLink>
                </>
              )}


              {/* =========================
                  MY BOOKINGS
              ========================= */}

              {user && (
                <NavLink
                  to="/my-bookings"
                  className={navClass}
                  onClick={closeMenu}
                >
                  <FaTicketAlt />
                  My Bookings
                </NavLink>
              )}


              {/* =========================
                  ORGANIZER
              ========================= */}

              {user?.role === "organizer" && (
                <>
                  <NavLink
                    to="/organizer"
                    className={navClass}
                    onClick={closeMenu}
                  >
                    <FaTachometerAlt />
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/organizer/create"
                    className={navClass}
                    onClick={closeMenu}
                  >
                    <FaPlus />
                    Create Event
                  </NavLink>
                </>
              )}


              {/* =========================
                  ADMIN
              ========================= */}

              {user?.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={navClass}
                  onClick={closeMenu}
                >
                  <FaTachometerAlt />
                  Admin
                </NavLink>
              )}
            </>
          )}


          {/* =========================
              MOBILE ACTIONS
          ========================= */}

          <div className="navbar-mobile-actions">

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="nav-user-mobile"
                  onClick={closeMenu}
                >
                  <FaUser />
                  Profile
                </Link>

                <button
                  className="logout-mobile"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-user-mobile"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn-gold nav-register-mobile"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </nav>


        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="navbar-right">

          {user && !isAuthPage && (
            <Notificationbell />
          )}

          {user && !isAuthPage ? (

            <div className="navbar-user">

              <Link
                to="/profile"
                className="navbar-user-profile"
              >
                <div className="navbar-avatar">
                  {user.name
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </div>

                <div className="navbar-user-info">
                  <span>
                    {user.name || "User"}
                  </span>

                  <small>
                    {user.role || "attendee"}
                  </small>
                </div>
              </Link>

              <button
                className="navbar-logout"
                onClick={handleLogout}
                title="Logout"
              >
                <FaSignOutAlt />
              </button>

            </div>

          ) : !isAuthPage ? (

            <div className="navbar-auth">

              <Link
                to="/login"
                className="navbar-login"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn-gold navbar-register"
              >
                Register
              </Link>

            </div>

          ) : null}

        </div>


        {/* =========================
            MOBILE BUTTON
        ========================= */}

        <button
          className="navbar-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>
    </header>
  );
}