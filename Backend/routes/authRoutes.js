const express = require("express");

const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Protected profile endpoints
router.get("/profile", protect, getProfile);
router.patch("/profile", protect, updateProfile);

module.exports = router;