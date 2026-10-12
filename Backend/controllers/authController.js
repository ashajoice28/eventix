
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ===============================
// REGISTER
// ===============================
const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const username = String(req.body.username || req.body.name || "").trim();

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    // Normalize email and username
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();

    // Validate role
    const allowedRoles = ["attendee", "organizer"];

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error: JWT_SECRET is missing" });
    }

    // Check existing email
    const existingEmail = await User.findOne({
      email: normalizedEmail,
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Check existing username
    const existingUsername = await User.findOne({
      username: normalizedUsername,
    });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "attendee",
    });

    const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(201).json({
      message: "Registration successful",
      token,
      user: { id: user._id, _id: user._id, username: user.username, name: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Register error:", error.stack || error.message);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email or username already exists",
      });
    }

    return res.status(500).json({
      message: "Server error during registration",
    });
  }
};

// ===============================
// LOGIN
// ===============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Check JWT configuration
    if (!process.env.JWT_SECRET) {
      console.error("Login error: JWT_SECRET is missing");

      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    // Find user
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Block accounts explicitly marked inactive
    if (user.isActive === false) {
      return res.status(403).json({
        message: "Your account has been deactivated",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Send response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Log the detailed error in the backend terminal only
    console.error(
      "Login error:",
      error.stack || error.message || error
    );

    return res.status(500).json({
      message: "Server error during login",
    });
  }
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  return res.json({ user: { ...user.toObject(), id: user._id, name: user.username, avatar: user.profileImage } });
};
const updateProfile = async (req, res) => {
  try {
    const updates = {};
    const nextName = String(req.body.username || req.body.name || "").trim();
    if (nextName) updates.username = nextName;
    if (typeof req.body.phone === "string") updates.phone = req.body.phone.trim();
    if (typeof req.body.location === "string") updates.location = req.body.location.trim();
    if (typeof req.body.dateOfBirth === "string") updates.dateOfBirth = req.body.dateOfBirth;
    if (typeof req.body.gender === "string") updates.gender = req.body.gender.trim();
    if (typeof req.body.avatar === "string") updates.profileImage = req.body.avatar;
    if (typeof req.body.email === "string") {
      const email = req.body.email.trim().toLowerCase();
      const exists = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (exists) return res.status(400).json({ message: "That email is already in use." });
      updates.email = email;
    }
    const user = await User.findByIdAndUpdate(req.user._id, { $set: updates }, { new: true, runValidators: true }).select("-password");
    return res.json({ message: "Profile updated", user: { ...user.toObject(), id: user._id, name: user.username, avatar: user.profileImage } });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Could not update profile." });
  }
};

module.exports = { register, login, getProfile, updateProfile };
