const express = require("express");
const router = express.Router();
const {
  getMyLocations,
  addLocation,
} = require("../controllers/locationController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMyLocations);
router.post("/", protect, addLocation);

module.exports = router;
