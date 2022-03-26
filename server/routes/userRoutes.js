const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  googleAuth,
  appleAuth,
  updateMyProfile,
  jobApplication,
} = require("../controllers/userController");

const {
  sendVerificationNumber,
  verifyPhoneNumber,
} = require("../controllers/verificationController");

// middleware
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/googleAuth", googleAuth);
router.post("/appleAuth", appleAuth);
router.post("/login", loginUser);
router.get("/profile", protect, getMe);
router.put("/profile", protect, updateMyProfile);
router.post("/phoneVerification/request", protect, sendVerificationNumber);
router.post("/phoneVerification/verify", protect, verifyPhoneNumber);
router.post("/jobApplication", jobApplication);

module.exports = router;
