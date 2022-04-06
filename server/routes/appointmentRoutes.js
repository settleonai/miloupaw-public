const express = require("express");
const router = express.Router();

const {
  createSetupIntent,
  createPaymentIntent,
} = require("../controllers/appointmentChargeController");
const {
  createAppointment,
  getMeetAndGreet,
  getServices,
} = require("../controllers/appointmentController");

const { protect, adminProtect } = require("../middleware/authMiddleware");

router.post("/", protect, createAppointment);
router.get("/meet-greets", adminProtect, getMeetAndGreet);
router.get("/services", protect, getServices);

router.post("/setup-intent", protect, createSetupIntent);
router.post("/charge", protect, createPaymentIntent);

module.exports = router;
