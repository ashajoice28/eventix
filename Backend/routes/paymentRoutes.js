const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { createOrder, verifyPayment, cancelPending } = require("../controllers/paymentController");
router.post("/create-order", protect, allowRoles("attendee"), createOrder);
router.post("/verify", protect, allowRoles("attendee"), verifyPayment);
router.post("/cancel/:id", protect, allowRoles("attendee"), cancelPending);
module.exports = router;
