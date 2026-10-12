const express = require("express");

const {
  getAllUsers,
  toggleUserStatus,
  getAllEvents,
  approveEvent,
  rejectEvent,
  deleteEvent,
  getAllBookings,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// All admin routes require login + admin role
router.use(protect);
router.use(authorizeRoles("admin"));

// ===============================
// USER MANAGEMENT
// ===============================

// Get all users
router.get("/users", getAllUsers);

// Activate / deactivate user
router.put("/users/:id/status", toggleUserStatus);

// ===============================
// EVENT MANAGEMENT
// ===============================

// Get all events
router.get("/events", getAllEvents);

// Approve event
router.put("/events/:id/approve", approveEvent);

// Reject event
router.put("/events/:id/reject", rejectEvent);

// Delete event
router.delete("/events/:id", deleteEvent);

// ===============================
// BOOKING MANAGEMENT
// ===============================

// Get all bookings
router.get("/bookings", getAllBookings);

module.exports = router;