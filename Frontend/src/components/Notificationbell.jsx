import { useEffect, useState } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaTicketAlt,
  FaCreditCard,
  FaTimes,
} from "react-icons/fa";

import api from "../services/api";

export default function Notificationbell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      setLoading(true);

      const response = await api.get("/notifications");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.notifications || [];

      setNotifications(data);
    } catch (error) {
      console.log("Notifications unavailable");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  async function markAsRead(id) {
    try {
      await api.put(`/notifications/${id}/read`);

      setNotifications((previous) =>
        previous.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.log("Unable to mark notification as read");
    }
  }

  function getNotificationIcon(title = "") {
    const text = title.toLowerCase();

    if (text.includes("payment")) {
      return <FaCreditCard />;
    }

    if (text.includes("booking") || text.includes("ticket")) {
      return <FaTicketAlt />;
    }

    return <FaCheckCircle />;
  }

  return (
    <div className="notification-wrapper">

      {/* BELL BUTTON */}
      <button
        className="notification-button"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
      >
        <FaBell />

        {unreadCount > 0 && (
          <span className="notification-count">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* NOTIFICATION PANEL */}
      {open && (
        <>
          <div
            className="notification-backdrop"
            onClick={() => setOpen(false)}
          />

          <div className="notification-panel">

            <div className="notification-header">

              <div>
                <h3>Notifications</h3>
                <span>
                  {unreadCount > 0
                    ? `${unreadCount} unread`
                    : "You're all caught up"}
                </span>
              </div>

              <button
                className="notification-close"
                onClick={() => setOpen(false)}
              >
                <FaTimes />
              </button>

            </div>

            <div className="notification-list">

              {loading ? (
                <div className="notification-empty">
                  Loading notifications...
                </div>
              ) : notifications.length === 0 ? (
                <div className="notification-empty">

                  <FaBell />

                  <h4>No notifications</h4>

                  <p>
                    Booking, payment and upcoming event updates
                    will appear here.
                  </p>

                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`notification-item ${
                      !notification.read
                        ? "notification-unread"
                        : ""
                    }`}
                    onClick={() =>
                      !notification.read &&
                      markAsRead(notification._id)
                    }
                  >

                    <div className="notification-icon">
                      {getNotificationIcon(notification.title)}
                    </div>

                    <div className="notification-content">

                      <h4>
                        {notification.title || "Eventix Update"}
                      </h4>

                      <p>
                        {notification.message}
                      </p>

                      <small>
                        {notification.createdAt
                          ? new Date(
                              notification.createdAt
                            ).toLocaleString()
                          : "Recently"}
                      </small>

                    </div>

                    {!notification.read && (
                      <span className="notification-dot"></span>
                    )}

                  </div>
                ))
              )}

            </div>

          </div>
        </>
      )}

    </div>
  );
}