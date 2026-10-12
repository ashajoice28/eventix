const User = require("../models/User");
const Event = require("../models/Event");
const Booking = require("../models/Booking");

// ===============================
// GET ALL USERS
// ===============================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      message: "Server error while fetching users",
    });
  }
};

// ===============================
// ACTIVATE / DEACTIVATE USER
// ===============================
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Prevent admin from deactivating themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot change your own account status",
      });
    }

    user.isActive = !user.isActive;

    await user.save();

    res.status(200).json({
      message: user.isActive
        ? "User activated successfully"
        : "User deactivated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Toggle user status error:", error);

    res.status(500).json({
      message: "Server error while updating user status",
    });
  }
};

// ===============================
// GET ALL EVENTS
// ===============================
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: events.length,
      events,
    });
  } catch (error) {
    console.error("Get all events error:", error);

    res.status(500).json({
      message: "Server error while fetching events",
    });
  }
};

// ===============================
// APPROVE EVENT
// ===============================
const approveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.status = "approved";

    await event.save();

    res.status(200).json({
      message: "Event approved successfully",
      event,
    });
  } catch (error) {
    console.error("Approve event error:", error);

    res.status(500).json({
      message: "Server error while approving event",
    });
  }
};

// ===============================
// REJECT EVENT
// ===============================
const rejectEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.status = "rejected";

    await event.save();

    res.status(200).json({
      message: "Event rejected successfully",
      event,
    });
  } catch (error) {
    console.error("Reject event error:", error);

    res.status(500).json({
      message: "Server error while rejecting event",
    });
  }
};

// ===============================
// DELETE EVENT
// ===============================
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Admin delete event error:", error);

    res.status(500).json({
      message: "Server error while deleting event",
    });
  }
};

// ===============================
// GET ALL BOOKINGS
// ===============================
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "username email")
      .populate(
        "event",
        "title date time venue city price"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get all bookings error:", error);

    res.status(500).json({
      message: "Server error while fetching bookings",
    });
  }
};

module.exports = {
  getAllUsers,
  toggleUserStatus,
  getAllEvents,
  approveEvent,
  rejectEvent,
  deleteEvent,
  getAllBookings,
};