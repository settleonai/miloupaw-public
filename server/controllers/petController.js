const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const Pet = require("../../models/petModel");

// @desc    Get user pets
// @route   GET /api/pets/
// @access  Private
const getMyPets = asyncHandler(async (req, res) => {
  console.log("req user", req.user);
  try {
    // find users pets
    const pets = await Pet.find({ user: req.user.id });
    console.log("pets", pets);

    res.status(200).json(pets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { getMyPets };
