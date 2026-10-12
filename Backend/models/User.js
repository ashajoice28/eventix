const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["attendee", "organizer", "admin"],
      default: "attendee",
    },

    profileImage: {
      type: String,
      default: "",
    },

    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    gender: { type: String, default: "" },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;