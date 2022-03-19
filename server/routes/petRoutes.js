const express = require("express");
const router = express.Router();
const { getMyPets } = require("../controllers/petController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMyPets);

module.exports = router;
