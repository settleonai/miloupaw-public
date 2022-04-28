const express = require("express");
const router = express.Router();

const {
  getApplicants,
  getEmployees,
  respondToApplicant,
  getClientProfile,
  getEmployee,
  searchBusinessProfile,
  getStripeAccountLink,
  getAvailableEmployees,
  getBaseFees,
  submitTimeOffRequest,
  getPersonalTimeOffRequests,
  getAdminTimeOffRequests,
  responseTimeOffRequest,
} = require("../controllers/businessController");

const {
  adminProtect,
  employeeProtect,
  protect,
} = require("../middleware/authMiddleware");

router.get("/applicants", adminProtect, getApplicants);
router.put("/applicants/:id", adminProtect, respondToApplicant);
router.get("/employees", adminProtect, getEmployees);
router.get("/employees/:id", protect, getEmployee);
router.get("/client-profile/:id", employeeProtect, getClientProfile);
router.post("/employees/search", adminProtect, searchBusinessProfile);
router.get("/stripe-profile", employeeProtect, getStripeAccountLink);
router.get("/available-employees", adminProtect, getAvailableEmployees);
router.get("/base-fees", employeeProtect, getBaseFees);
router.post("/time-off-requests", employeeProtect, submitTimeOffRequest);
router.get("/time-off-requests/personal", protect, getPersonalTimeOffRequests);
router.get("/time-off-requests/admin", adminProtect, getAdminTimeOffRequests);
router.put("/time-off-requests/:id", adminProtect, responseTimeOffRequest);

module.exports = router;
