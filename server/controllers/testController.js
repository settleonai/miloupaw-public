const asyncHandler = require("express-async-handler");
const businessProfileModel = require("../../models/businessProfileModel");
const profileModel = require("../../models/profileModel");
const userModel = require("../../models/userModel");
const appointmentModel = require("../../models/appointmentModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

// @desc    Get user pets
// @route   GET /api/pets/
// @access  Private
exports.testCommand = asyncHandler(async (req, res) => {});
