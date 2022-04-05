const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const Pet = require("../../models/petModel");
const Profile = require("../../models/profileModel");

// @desc    Get user pets
// @route   GET /api/pets/
// @access  Private
const getMyPets = asyncHandler(async (req, res) => {
  try {
    // find users pets
    const pets = await Pet.find({ user: req.user.id });

    res.status(200).json(pets);
  } catch (error) {
    console.log(error);
  }
});

// @desc    Add a new pet
// @route   POST /api/pets/
// @access  Private
const addPet = asyncHandler(async (req, res) => {
  try {
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
      user: req.user.id,
      general_info,
      characteristics,
      location_rules,
      training,
      emergency_veterinarian,
      vaccinations,
      medical,
    });

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { pets: pet._id } },
      { new: true }
    )
      .populate("pets")
      .populate("locations");

    // console.log("profile", profile);
    // return res.status(401).json("error");

    res.status(201).json({ profile, petId: pet._id });
  } catch (error) {
    console.log(error);
  }
});

// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Private
const updatePet = asyncHandler(async (req, res) => {
  try {
    const {
      general_info,
      characteristics,
      location_rules,
      training,
      emergency_veterinarian,
      vaccinations,
      medical,
    } = req.body;

    console.log("vaccinations", vaccinations);

    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id },
      {
        general_info,
        characteristics,
        location_rules,
        training,
        emergency_veterinarian,
        vaccinations,
        medical,
      },
      { new: true }
    );

    const profile = await Profile.findOne({ user: req.user.id })
      .populate("pets")
      .populate({
        path: "pets",
        populate: {
          path: "vaccinations",
          model: "vaccineSchema",
        },
      })
      .populate("locations");

    res.status(201).json({ profile, petId: pet._id });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { getMyPets, addPet, updatePet };
