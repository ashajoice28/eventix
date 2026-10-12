
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1):5173$/.test(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Eventix API Running");
});

// Existing API routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Eventix server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Unable to start Eventix API:", error.message);
    process.exit(1);
  });
