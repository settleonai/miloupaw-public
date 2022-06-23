const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const Pet = require("../../models/petModel");
const Profile = require("../../models/profileModel");
const {
  DOG_BREEDS,
  CAT_BREEDS,
  DOG_BREEDS_KEYS,
  CAT_BREEDS_KEYS,
} = require("../utils/pet-breeds");

// @desc    Get user pets
// @route   GET /api/pets/
// @access  Private
const getMyPets = asyncHandler(async (req, res) => {
  console.log("getMyPets");

  try {
    // find users pets
    const pets = await Pet.find({ user: req.user._id });

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
      user: req.user._id,
      general_info,
      characteristics,
      location_rules,
      training,
      emergency_veterinarian,
      vaccinations,
      medical,
    });

    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { pets: pet._id } },
      { new: true }
    );
    // console.log("profile", profile);
    // return res.status(401).json("error");

    res.status(201).json({ success: true, result: pet._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
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

    res.status(201).json({ success: true, result: pet._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const getPet = asyncHandler(async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    res.status(200).json({
      success: true,
      result: pet,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    get breed
// @route   GET /api/pets/pet-breeds/:breed
// @access  Private
const getBreed = asyncHandler(async (req, res) => {
  console.log("getBreed");
  try {
    const breed = req.params.breed;
    const type = req.params.type;
    let list;

    if (!type) {
      return res.status(400).json({
        success: false,
        error: "Please provide a type",
      });
    }

    if (type === "dog") {
      list = DOG_BREEDS_KEYS;
    }
    if (type === "cat") {
      list = CAT_BREEDS_KEYS;
    }

    const regexp = new RegExp(breed, "i");
    const results = list
      .filter((breed) => regexp.test(breed))
      .slice(0, 4)
      .map((breed) => {
        const result = type === "dog" ? DOG_BREEDS[breed] : CAT_BREEDS[breed];
        return {
          breed: breed,
          ...result,
        };
      });

    if (!results) {
      return res.status(400).json({
        success: false,
        error: "No breed found",
      });
    }

    return res.status(200).json({
      success: true,
      result: results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = { getMyPets, addPet, updatePet, getPet, getBreed };
