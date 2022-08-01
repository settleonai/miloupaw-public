const express = require("express");
const router = express.Router();
const { testCommand } = require("../controllers/testController");

router.get("/", testCommand);

// router.delete("/:id", protect, deleteLocation);

module.exports = router;
