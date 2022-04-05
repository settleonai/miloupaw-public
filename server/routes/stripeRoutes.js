const express = require("express");
const router = express.Router();
const {
  stripeGeneralHook,
  stripeConnectHook,
} = require("../controllers/stripeController");

router.post("/", express.raw({ type: "application/json" }), stripeGeneralHook);
router.post(
  "/connect",
  express.raw({ type: "application/json" }),
  stripeConnectHook
);

module.exports = router;
