import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaExclamationCircle,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [notification, setNotification] =
    useState({
      show: false,
      type: "",
      message: "",
    });

  /* ================================
     NOTIFICATION
  ================================= */

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

  /* ================================
     INPUT CHANGE
  ================================= */

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  /* ================================
     LOGIN
  ================================= */

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.email.trim()) {
      showNotification(
        "error",
        "Please enter your email address."
      );
      return;
    }

    if (!form.password) {
      showNotification(
        "error",
        "Please enter your password."
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

    try {
      setLoading(true);

      await login(
        form.email.trim(),
        form.password
      );

      showNotification(
        "success",
        "Login successful! Welcome to Eventix."
      );

      setTimeout(() => {
        navigate("/home", {
          replace: true,
        });
      }, 800);

    } catch (error) {
      console.log(error);

      let message =
        "Invalid email or password. Please try again.";

      if (error.response?.data?.message) {
        message =
          error.response.data.message;
      }

      showNotification(
        "error",
        message
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      {/* =================================
          NOTIFICATION
      ================================= */}

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
                : "Login Failed"}
            </strong>

            <span>
              {notification.message}
            </span>

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
          >
            <FaTimes />
          </button>

        </div>
      )}

      {/* =================================
          LOGIN CONTAINER
      ================================= */}

      <div className="auth-container">

        {/* =================================
            LEFT SIDE
        ================================= */}

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
              WELCOME BACK
            </span>

            <h1>
              Your next
              <br />
              <span>experience</span>
              <br />
              awaits.
            </h1>

            <p>
              Discover incredible events, book your
              tickets and create unforgettable
              memories with Eventix.
            </p>

          </div>

        </div>

        {/* =================================
            RIGHT SIDE
        ================================= */}

        <div className="auth-form-section">

          <div className="auth-form-container">

            {/* MOBILE LOGO */}

            <div className="auth-mobile-logo">
              EVENT<span>IX</span>
            </div>

            {/* HEADING */}

            <div className="auth-heading">

              <span className="gold-label">
                ACCOUNT LOGIN
              </span>

              <h2>
                Welcome Back
              </h2>

              <p>
                Sign in to continue to your
                Eventix account.
              </p>

            </div>

            {/* FORM */}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

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

                <div className="auth-label-row">

                  <label>
                    Password
                  </label>

                  <Link to="/forgot-password">
                    Forgot Password?
                  </Link>

                </div>

                <div className="auth-input-wrapper">

                  <FaLock />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
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

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="login-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight />
                  </>
                )}

              </button>

            </form>

            {/* REGISTER */}

            <div className="auth-register">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create Account
              </Link>

            </div>

            {/* DIVIDER */}

            <div className="auth-divider">
              <span>EVENTIX</span>
            </div>

            {/* FOOTER TEXT */}

            <p className="auth-footer-text">
              By continuing, you agree to our Terms &
              Conditions and Privacy Policy.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}