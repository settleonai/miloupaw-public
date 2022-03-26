const express = require("express");
const router = express.Router();

const { createAppointment } = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createAppointment);

module.exports = router;
