const express = require("express");
const router = express.Router();

const {
  getApplicants,
  getEmployees,
  respondToApplicant,
  getClientProfile,
  getEmployeeProfile,
  searchBusinessProfile,
  getStripeAccountLink,
} = require("../controllers/businessController");

const {
  adminProtect,
  employeeProtect,
} = require("../middleware/authMiddleware");

router.get("/applicants", adminProtect, getApplicants);
router.put("/applicants/:id", adminProtect, respondToApplicant);
router.get("/employees", adminProtect, getEmployees);
router.get("/client-profile/:id", employeeProtect, getClientProfile);
router.get("/employee-profile/:id", employeeProtect, getEmployeeProfile);
router.post("/employees/search", adminProtect, searchBusinessProfile);
router.get("/stripe-profile", employeeProtect, getStripeAccountLink);

module.exports = router;
