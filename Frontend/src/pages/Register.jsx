
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "attendee",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  function showNotification(type, message) {
    setNotification({
      show: true,
      type,
      message,
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim()) return showNotification("error", "Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return showNotification("error", "Please enter a valid email address.");
    if (form.password.length < 6) return showNotification("error", "Password must contain at least 6 characters.");
    if (form.password !== form.confirmPassword) return showNotification("error", "Passwords do not match.");
    if (!["attendee", "organizer"].includes(form.role)) return showNotification("error", "Please select an account type.");
    setLoading(true);
    try {
      await register({ name: form.name.trim(), email: form.email.trim().toLowerCase(), password: form.password, role: form.role });
      showNotification("success", "Account saved to the database. Welcome to Eventix!");
      setTimeout(() => navigate(form.role === "organizer" ? "/organizer" : "/my-bookings", { replace: true }), 450);
    } catch (error) {
      showNotification("error", error.response?.data?.message || error.message || "Registration failed. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <div className="auth-page">
      {/* TOP MENU */}
      <div className="auth-top-menu">
        <Link to="/" className="auth-menu-link">
          HOME
        </Link>

        <Link to="/login" className="auth-menu-link">
          LOGIN
        </Link>

        <Link to="/register" className="auth-menu-link">
          REGISTER
        </Link>
      </div>

      {/* NOTIFICATION */}
      {notification.show && (
        <div
          className={`auth-notification ${
            notification.type === "success"
              ? "notification-success"
              : "notification-error"
          }`}
        >
          <div className="auth-notification-icon">
            {notification.type === "success" ? (
              <FaCheckCircle />
            ) : (
              <FaExclamationCircle />
            )}
          </div>

          <div className="auth-notification-content">
            <strong>
              {notification.type === "success"
                ? "Success"
                : "Registration Failed"}
            </strong>

            <span>{notification.message}</span>
          </div>

          <button
            type="button"
            onClick={() =>
              setNotification({
                show: false,
                type: "",
                message: "",
              })
            }
            aria-label="Close notification"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <div className="auth-container">
        {/* LEFT SIDE */}
        <div className="auth-visual">
          <div className="auth-visual-overlay"></div>

          <div className="auth-visual-content">
            <Link to="/" className="auth-logo">
              EVENT<span>IX</span>
            </Link>

            <span className="gold-label">JOIN EVENTIX</span>

            <h1>
              Your next
              <br />
              <span>experience</span>
              <br />
              starts here.
            </h1>

            <p>
              Create your Eventix account and discover concerts,
              festivals, workshops, sports events and unforgettable
              experiences.
            </p>

            <div className="register-benefits">
              <div>
                <FaCheckCircle />
                <span>Discover amazing events</span>
              </div>

              <div>
                <FaCheckCircle />
                <span>Book tickets easily</span>
              </div>

              <div>
                <FaCheckCircle />
                <span>Manage your bookings</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-mobile-logo">
              EVENT<span>IX</span>
            </div>

            {/* HEADING */}
            <div className="auth-heading">
              <span className="gold-label">CREATE ACCOUNT</span>

              <h2>Join Eventix</h2>

              <p>
                Create your account and start discovering events.
              </p>
            </div>

            {/* REGISTRATION FORM */}
            <form className="auth-form" onSubmit={handleSubmit}>
              {/* NAME */}
              <div className="auth-input-group">
                <label htmlFor="register-name">Full Name</label>

                <div className="auth-input-wrapper">
                  <FaUser />

                  <input
                    id="register-name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="auth-input-group">
                <label htmlFor="register-email">Email Address</label>

                <div className="auth-input-wrapper">
                  <FaEnvelope />

                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="auth-input-group">
                <label htmlFor="register-password">Password</label>

                <div className="auth-input-wrapper">
                  <FaLock />

                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="auth-input-group">
                <label htmlFor="register-confirm-password">
                  Confirm Password
                </label>

                <div className="auth-input-wrapper">
                  <FaLock />

                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* ACCOUNT TYPE */}
              <div className="account-type-group">
                <label className="account-type-title">
                  Account Type
                </label>

                <div className="account-type-options">
                  {/* ATTENDEE */}
                  <label
                    className={`account-type-option ${
                      form.role === "attendee"
                        ? "account-type-option-active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="attendee"
                      checked={form.role === "attendee"}
                      onChange={handleChange}
                    />

                    <span>
                      <strong>Attendee</strong>
                      <small>Book events</small>
                    </span>
                  </label>

                  {/* ORGANIZER */}
                  <label
                    className={`account-type-option ${
                      form.role === "organizer"
                        ? "account-type-option-active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="organizer"
                      checked={form.role === "organizer"}
                      onChange={handleChange}
                    />

                    <span>
                      <strong>Organizer</strong>
                      <small>Create events</small>
                    </span>
                  </label>
                </div>
              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account
                    <span>→</span>
                  </>
                )}
              </button>

              {/* LOGIN LINK */}
              <div className="auth-register">
                <span>Already have an account?</span>

                <Link to="/login">Sign In</Link>
              </div>

              {/* DIVIDER */}
              <div className="auth-divider">
                <span>EVENTIX</span>
              </div>

              {/* FOOTER */}
              <p className="auth-footer-text">
                By creating an account, you agree to our Terms &
                Conditions and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
