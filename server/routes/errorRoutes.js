const express = require("express");
const router = express.Router();
const { recordError } = require("../controllers/errorController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, recordError);

module.exports = router;
