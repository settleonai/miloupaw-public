const express = require("express");
const router = express.Router();
const { getMyPets, addPet } = require("../controllers/petController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMyPets);
router.post("/", protect, addPet);

module.exports = router;
