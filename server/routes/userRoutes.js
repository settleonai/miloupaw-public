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
  getMyBusinessProfile,
  updateMyBusinessProfile,
  setPushToken,
} = require("../controllers/userController");

const {
  sendVerificationNumber,
  verifyPhoneNumber,
} = require("../controllers/verificationController");

// middleware
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/set-push-token", protect, setPushToken);
router.post("/googleAuth", googleAuth);
router.post("/appleAuth", appleAuth);
router.post("/login", loginUser);
router.get("/profile", protect, getMe);
router.put("/profile", protect, updateMyProfile);
router.post("/phoneVerification/request", protect, sendVerificationNumber);
router.post("/phoneVerification/verify", protect, verifyPhoneNumber);
router.post("/jobApplication", jobApplication);
router.get("/business-profile", protect, getMyBusinessProfile);
router.put("/business-profile", protect, updateMyBusinessProfile);

module.exports = router;
