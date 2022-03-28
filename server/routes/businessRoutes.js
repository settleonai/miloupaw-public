const express = require("express");
const router = express.Router();

const {
  getApplicants,
  getEmployees,
} = require("../controllers/businessController");

const { adminProtect } = require("../middleware/authMiddleware");

router.get("/applicants", adminProtect, getApplicants);
router.get("/employees", adminProtect, getEmployees);

module.exports = router;
