const express = require("express");
const router = express.Router();

const {
  createSetupIntent,
  createPaymentIntent,
  setupAdditionalTip,
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
  appointmentTripRecord,
  writeJournal,
  quickActionJournal,
  getJournal,
  getJournalByAppointmentId,
  writeReview,
  deleteAppointment,
  submitClaim,
  getClaim,
  sendClaimMessage,
  getClaimsList,
  submitClaimDecision,
  updateJournal,
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
router.post("/tip", protect, setupAdditionalTip);
router.post("/response", employeeProtect, responseAppointmentRequest);
router.post("/journal", employeeProtect, writeJournal);
router.get("/journal/:id", protect, getJournal);
router.get("/:id/journal", protect, getJournalByAppointmentId);
router.put("/journal/:id/quick_action", employeeProtect, quickActionJournal);
router.put("/journal/:id", employeeProtect, updateJournal);
router.post("/review", protect, writeReview);
router.post("/claim", protect, submitClaim);
router.get("/claims-list", adminProtect, getClaimsList);
router.get("/claim/:id", protect, getClaim);
router.post("/claim/:id/message", protect, sendClaimMessage);
router.put("/claim/:id/decision", adminProtect, submitClaimDecision);
router.put("/:id/check-in-out", protect, appointmentCheckInOut);
router.put("/:id/trip-record", employeeProtect, appointmentTripRecord);
router.put("/:id", protect, updateAppointment);
router.delete("/:id", protect, deleteAppointment);
router.get("/:id", employeeProtect, getAppointment);

module.exports = router;
