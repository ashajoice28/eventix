const express = require("express");

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getOrganizerAttendees,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/organizer/attendees", protect, authorizeRoles("organizer"), getOrganizerAttendees);

// Create booking
router.post(
  "/",
  protect,
  authorizeRoles("attendee"),
  createBooking
);

// Get my bookings
router.get(
  "/my-bookings",
  protect,
  authorizeRoles("attendee"),
  getMyBookings
);

// Get single booking
router.get(
  "/:id",
  protect,
  authorizeRoles("attendee"),
  getBookingById
);

// Cancel booking
router.put(
  "/:id/cancel",
  protect,
  authorizeRoles("attendee"),
  cancelBooking
);

module.exports = router;