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

// @desc    Add a new pet
// @route   POST /api/pets/
// @access  Private
const addPet = asyncHandler(async (req, res) => {
  const {
    general_info,
    characteristics,
    location_rules,
    training,
    emergency_veterinarian,
    vaccinations,
    medical,
  } = req.body;

  const pet = await Pet.create({
    user: req.user._id,
    general_info,
    characteristics,
    location_rules,
    training,
    emergency_veterinarian,
    vaccinations,
    medical,
  });

  res.status(201).json(pet);
});

module.exports = { getMyPets, addPet };
