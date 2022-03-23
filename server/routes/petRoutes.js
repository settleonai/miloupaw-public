const express = require("express");
const router = express.Router();
const {
  getMyPets,
  addPet,
  updatePet,
} = require("../controllers/petController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMyPets);
router.post("/", protect, addPet);
router.put("/:id", protect, updatePet);
// router.delete("/:id", protect, deleteLocation);

module.exports = router;
