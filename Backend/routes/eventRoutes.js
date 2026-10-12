const express = require("express");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents,
} = require("../controllers/eventController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all approved events
router.get("/", getEvents);

// Get one event
router.get("/:id", getEventById);

// ==========================================
// ORGANIZER ROUTES
// ==========================================

// Create event
router.post(
  "/",
  protect,
  authorizeRoles("organizer"),
  createEvent
);

// Get organizer's own events
router.get(
  "/organizer/my-events",
  protect,
  authorizeRoles("organizer"),
  getMyEvents
);

// Update event
router.put(
  "/:id",
  protect,
  authorizeRoles("organizer"),
  updateEvent
);

// Delete event
router.delete(
  "/:id",
  protect,
  authorizeRoles("organizer"),
  deleteEvent
);

module.exports = router;