const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getMeetAndGreet,
  getServices,
  createPaymentIntent,
} = require("../controllers/appointmentController");

const { protect, adminProtect } = require("../middleware/authMiddleware");

router.post("/", protect, createAppointment);
router.get("/meet-greets", adminProtect, getMeetAndGreet);
router.get("/services", protect, getServices);
router.post("/payment-sheet", protect, createPaymentIntent);

module.exports = router;
