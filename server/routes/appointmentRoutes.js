const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getMeetAndGreet,
} = require("../controllers/appointmentController");

const { protect, adminProtect } = require("../middleware/authMiddleware");

router.post("/", protect, createAppointment);
router.get("/meet-greets", adminProtect, getMeetAndGreet);

module.exports = router;
