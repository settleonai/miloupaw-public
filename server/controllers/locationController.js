const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const Location = require("../../models/locationModel");

// @desc    Get my locations
// @route   GET /api/location/
// @access  Private
const getMyLocations = asyncHandler(async (req, res) => {
  console.log("req user", req.user);
  try {
    // find users locations
    const locations = await Location.find({ user: req.user.id });
    console.log("locations", locations);

    res.status(200).json(locations);
  } catch (error) {
    console.log(error);
  }
});

// @desc    Create new location
// @route   POST /api/location/
// @access  Private
const addLocation = asyncHandler(async (req, res) => {
  const {
    title,
    address,
    coordinates,
    uses_keys,
    has_alarm,
    has_camera,
    alarm_code,
    access_parking_notes,
    additional_notes,
    photos,
  } = req.body;

  const location = await Location.create({
    user: req.user._id,
    title,
    address,
    coordinates,
    uses_keys,
    has_alarm,
    has_camera,
    alarm_code,
    access_parking_notes,
    additional_notes,
    photos,
  });

  res.status(201).json(location);
});

module.exports = { getMyLocations, addLocation };
