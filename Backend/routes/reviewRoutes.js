const express = require("express");

const {
  addReview,
  getEventReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Add review
router.post(
  "/",
  protect,
  authorizeRoles("attendee"),
  addReview
);

// Get reviews for an event
router.get(
  "/event/:eventId",
  getEventReviews
);

// Update review
router.put(
  "/:id",
  protect,
  authorizeRoles("attendee"),
  updateReview
);

// Delete review
router.delete(
  "/:id",
  protect,
  authorizeRoles("attendee"),
  deleteReview
);

module.exports = router;