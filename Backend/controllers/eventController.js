const Event = require("../models/Event");

// ==========================================
// CREATE EVENT
// ==========================================
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      time,
      venue,
      city,
      price,
      totalSeats,
      banner,
    } = req.body;

    // Check required fields
    if (
      !title ||
      !description ||
      !category ||
      !date ||
      !time ||
      !venue ||
      !city ||
      price === undefined ||
      !totalSeats
    ) {
      return res.status(400).json({
        message: "Please provide all required event details",
      });
    }

    // Create event
    const event = await Event.create({
      title,
      description,
      category,
      date,
      time,
      venue,
      city,
      price,
      totalSeats,
      availableSeats: totalSeats,
      banner: banner || "",
      organizer: req.user._id,
      status: "approved",
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create event error:", error);

    res.status(500).json({
      message: "Server error while creating event",
    });
  }
};

// ==========================================
// GET ALL APPROVED EVENTS
// ==========================================
const getEvents = async (req, res) => {
  try {
    const search = String(req.query.search || "").trim();
    const category = String(req.query.category || "All");
    const city = String(req.query.city || "").trim();
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = 16;

    const filter = { status: "approved" };

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { title: { $regex: escapedSearch, $options: "i" } },
        { description: { $regex: escapedSearch, $options: "i" } },
        { city: { $regex: escapedSearch, $options: "i" } },
        { venue: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    if (category !== "All") filter.category = category;

    if (city) {
      const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.city = { $regex: escapedCity, $options: "i" };
    }

    const total = await Event.countDocuments(filter);
    const events = await Event.find(filter)
      .populate("organizer", "username email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      count: events.length,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      events,
    });
  } catch (error) {
    console.error("Get events error:", error);
    return res.status(500).json({
      message: "Server error while fetching events",
    });
  }
};

// ==========================================
// GET EVENT BY ID
// ==========================================
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "username email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      event,
    });
  } catch (error) {
    console.error("Get event error:", error);

    res.status(500).json({
      message: "Server error while fetching event",
    });
  }
};

// ==========================================
// UPDATE EVENT
// ==========================================
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Only the organizer who created the event can update it
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only update your own events",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "category",
      "date",
      "time",
      "venue",
      "city",
      "price",
      "totalSeats",
      "banner",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        event[field] = req.body[field];
      }
    });

    // Recalculate available seats if total seats changes
    if (req.body.totalSeats !== undefined) {
      const bookedSeats =
        event.totalSeats - event.availableSeats;

      event.availableSeats =
        Number(req.body.totalSeats) - bookedSeats;

      if (event.availableSeats < 0) {
        return res.status(400).json({
          message:
            "Total seats cannot be less than already booked seats",
        });
      }
    }

    // Keep organizer edits visible to attendees.
    event.status = "approved";

    await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Update event error:", error);

    res.status(500).json({
      message: "Server error while updating event",
    });
  }
};

// ==========================================
// DELETE EVENT
// ==========================================
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Only owner can delete
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own events",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error);

    res.status(500).json({
      message: "Server error while deleting event",
    });
  }
};

// ==========================================
// GET ORGANIZER EVENTS
// ==========================================
const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({
      organizer: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: events.length,
      events,
    });
  } catch (error) {
    console.error("Get organizer events error:", error);

    res.status(500).json({
      message: "Server error while fetching your events",
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents,
};