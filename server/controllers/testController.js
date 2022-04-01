const asyncHandler = require("express-async-handler");
const businessProfileModel = require("../../models/businessProfileModel");
const profileModel = require("../../models/profileModel");
const userModel = require("../../models/userModel");

// @desc    Get user pets
// @route   GET /api/pets/
// @access  Private
exports.testCommand = asyncHandler(async (req, res) => {
  try {
    // get all profiles and copy picture to user model
    const users = await userModel.find();

    users.forEach(async (user) => {
      user.pictures.push(user.picture);
      await user.save();
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
});
