const express = require("express");
const router = express.Router();

const {
  createSetupIntent,
  createPaymentIntent,
} = require("../controllers/appointmentChargeController");
const {
  getAppointments,
  getClientAppointments,
  getClientAppointment,
  createAppointment,
  getMeetAndGreet,
  getServices,
  updateAppointment,
  getAppointment,
  assignEmployee,
  responseAppointmentRequest,
  appointmentCheckInOut,
  writeJournal,
  getJournal,
  writeReview,
  deleteAppointment,
} = require("../controllers/appointmentController");

const {
  protect,
  adminProtect,
  employeeProtect,
} = require("../middleware/authMiddleware");

router.get("/", employeeProtect, getAppointments);
router.get("/client-appointments", protect, getClientAppointments);
router.get("/client-appointment/:id", protect, getClientAppointment);
router.post("/", protect, createAppointment);
router.get("/meet-greets", adminProtect, getMeetAndGreet);
router.get("/services", protect, getServices);
router.put("/assign-employee", adminProtect, assignEmployee);
router.post("/setup-intent", protect, createSetupIntent);
router.post("/charge", protect, createPaymentIntent);
router.post("/response", employeeProtect, responseAppointmentRequest);
router.post("/journal", employeeProtect, writeJournal);
router.get("/journal/:id", protect, getJournal);
router.post("/review", protect, writeReview);
router.put("/:id/check-in-out", protect, appointmentCheckInOut);
router.put("/:id", protect, updateAppointment);
router.delete("/:id", protect, deleteAppointment);
router.get("/:id", employeeProtect, getAppointment);

module.exports = router;
