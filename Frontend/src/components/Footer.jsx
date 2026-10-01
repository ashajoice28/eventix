import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid">

          {/* BRAND */}
          <div className="footer-brand">

            <Link to="/" className="footer-logo">
              EVENT<span className="gold">IX</span>
            </Link>

            <p>
              Discover unforgettable experiences, book your tickets,
              and create memories that last forever.
            </p>

            <div className="footer-socials">

              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>

            </div>
          </div>

          {/* EXPLORE */}
          <div className="footer-column">

            <h3>Explore</h3>

            <Link to="/">Home</Link>
            <Link to="/events">All Events</Link>
            <Link to="/events?category=music">Music</Link>
            <Link to="/events?category=technology">Technology</Link>
            <Link to="/events?category=sports">Sports</Link>

          </div>

          {/* PLATFORM */}
          <div className="footer-column">

            <h3>Platform</h3>

            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/profile">My Profile</Link>
            <Link to="/organizer">Organizer</Link>
            <Link to="/organizer/create">Create Event</Link>

          </div>

          {/* SUPPORT */}
          <div className="footer-column">

            <h3>Support</h3>

            <a href="#contact">Contact Us</a>
            <a href="#faq">FAQ</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} Eventix. All rights reserved.
          </p>

          <button
            className="back-to-top"
            onClick={scrollToTop}
            title="Back to top"
          >
            <FaArrowUp />
          </button>

        </div>

      </div>

    </footer>
  );
}