const express = require("express");
const router = express.Router();
const {
  getMyLocations,
  addLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMyLocations);
router.post("/", protect, addLocation);
router.put("/:id", protect, updateLocation);
router.delete("/:id", protect, deleteLocation);

module.exports = router;
