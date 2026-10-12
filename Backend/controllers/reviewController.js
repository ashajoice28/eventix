const Review = require("../models/Review");
const Booking = require("../models/Booking");
const Event = require("../models/Event");

// ADD REVIEW
const addReview = async (req, res) => {
  try {
    const { eventId, rating, comment } = req.body;

    if (!eventId || !rating || !comment) {
      return res.status(400).json({
        message: "Event ID, rating and comment are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // Check whether event exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check whether user booked the event
    const booking = await Booking.findOne({
      user: req.user._id,
      event: eventId,
      bookingStatus: "confirmed",
    });

    if (!booking) {
      return res.status(403).json({
        message: "You can review only events you have attended",
      });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({
      user: req.user._id,
      event: eventId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this event",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      event: eventId,
      rating,
      comment,
    });

    const populatedReview = await Review.findById(review._id)
      .populate("user", "username")
      .populate("event", "title");

    res.status(201).json({
      message: "Review added successfully",
      review: populatedReview,
    });
  } catch (error) {
    console.error("Add review error:", error);

    res.status(500).json({
      message: "Server error while adding review",
    });
  }
};

// GET REVIEWS FOR EVENT
const getEventReviews = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const reviews = await Review.find({
      event: eventId,
    })
      .populate("user", "username profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Get reviews error:", error);

    res.status(500).json({
      message: "Server error while fetching reviews",
    });
  }
};

// UPDATE REVIEW
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // Only review owner can update
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only update your own review",
      });
    }

    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          message: "Rating must be between 1 and 5",
        });
      }

      review.rating = rating;
    }

    if (comment !== undefined) {
      review.comment = comment;
    }

    await review.save();

    const updatedReview = await Review.findById(review._id)
      .populate("user", "username")
      .populate("event", "title");

    res.status(200).json({
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    console.error("Update review error:", error);

    res.status(500).json({
      message: "Server error while updating review",
    });
  }
};

// DELETE REVIEW
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // Only review owner can delete
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own review",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    res.status(500).json({
      message: "Server error while deleting review",
    });
  }
};

module.exports = {
  addReview,
  getEventReviews,
  updateReview,
  deleteReview,
};