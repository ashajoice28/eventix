import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
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

    setTimeout(() => {
      setNotification({
        show: false,
        type: "",
        message: "",
      });
    }, 3500);
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

    if (!form.name.trim()) {
      showNotification(
        "error",
        "Please enter your full name."
      );
      return;
    }

    if (!form.email.trim()) {
      showNotification(
        "error",
        "Please enter your email address."
      );
      return;
    }

    if (!form.email.includes("@")) {
      showNotification(
        "error",
        "Please enter a valid email address."
      );
      return;
    }

    if (!form.password) {
      showNotification(
        "error",
        "Please create a password."
      );
      return;
    }

    if (form.password.length < 6) {
      showNotification(
        "error",
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      showNotification(
        "error",
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });

      showNotification(
        "success",
        "Account created successfully!"
      );

      setTimeout(() => {
        navigate("/");
      }, 800);

    } catch (error) {
      console.log(error);

      const message =
        error.response?.data?.message ||
        "Unable to create your account. Please try again.";

      showNotification("error", message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

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
            onClick={() =>
              setNotification({
                show: false,
                type: "",
                message: "",
              })
            }
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

            <Link
              to="/"
              className="auth-logo"
            >
              EVENT<span>IX</span>
            </Link>

            <span className="gold-label">
              JOIN EVENTIX
            </span>

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

            <div className="auth-heading">

              <span className="gold-label">
                CREATE ACCOUNT
              </span>

              <h2>
                Join Eventix
              </h2>

              <p>
                Create your account and start discovering events.
              </p>

            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}
              <div className="auth-input-group">

                <label>
                  Full Name
                </label>

                <div className="auth-input-wrapper">

                  <FaUser />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />

                </div>

              </div>

              {/* EMAIL */}
              <div className="auth-input-group">

                <label>
                  Email Address
                </label>

                <div className="auth-input-wrapper">

                  <FaEnvelope />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="auth-input-group">

                <label>
                  Password
                </label>

                <div className="auth-input-wrapper">

                  <FaLock />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="auth-input-group">

                <label>
                  Confirm Password
                </label>

                <div className="auth-input-wrapper">

                  <FaLock />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              {/* ACCOUNT TYPE */}
              <div className="auth-input-group">

                <label>
                  Account Type
                </label>

                <div className="role-selection">

                  <label
                    className={`role-option ${
                      form.role === "attendee"
                        ? "role-option-active"
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

                  <label
                    className={`role-option ${
                      form.role === "organizer"
                        ? "role-option-active"
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

              {/* SUBMIT */}
              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="login-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FaArrowRight />
                  </>
                )}

              </button>

            </form>

            {/* LOGIN */}
            <div className="auth-register">

              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign In
              </Link>

            </div>

            <div className="auth-divider">
              <span>EVENTIX</span>
            </div>

            <p className="auth-footer-text">
              By creating an account, you agree to our Terms &
              Conditions and Privacy Policy.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}