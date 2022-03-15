const express = require("express");
const userModel = require("../../models/userModel");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  googleAuth,
  appleAuth,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/googleAuth", googleAuth);
router.post("/appleAuth", appleAuth);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
