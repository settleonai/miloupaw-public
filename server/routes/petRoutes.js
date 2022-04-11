const express = require("express");
const router = express.Router();
const {
  getMyPets,
  addPet,
  updatePet,
  getPet,
} = require("../controllers/petController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMyPets);
router.post("/", protect, addPet);
router.get("/:id", protect, getPet);
router.put("/:id", protect, updatePet);
// router.delete("/:id", protect, deleteLocation);

module.exports = router;
