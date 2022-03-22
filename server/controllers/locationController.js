const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const Location = require("../../models/locationModel");
const Profile = require("../../models/profileModel");

// @desc    Get my locations
// @route   GET /api/location/
// @access  Private
const getMyLocations = asyncHandler(async (req, res) => {
  console.log("req user", req.user);
  try {
    // find users locations
    const locations = await Location.find({ user: req.user._id });
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

  const profile = await Profile.findOneAndUpdate(
    { user: req.user._id },
    { $push: { locations: location._id } },
    { new: true }
  )
    .populate("locations")
    .populate("pets");

  res.status(201).json(profile);
});

// @desc    Update a location
// @route   PUT /api/location/:id
// @access  Private
const updateLocation = asyncHandler(async (req, res) => {
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

  // find location
  const location = await Location.findOne({ _id: req.params.id });

  // check if user owns location or is admin
  if (req.user._id !== location.user.toString() && req.user.role !== "admin") {
    return res.status(401).json({ msg: "Not authorized" });
  }

  // update location fields
  location.title = title;
  location.address = address;
  location.coordinates = coordinates;
  location.uses_keys = uses_keys;
  location.has_alarm = has_alarm;
  location.has_camera = has_camera;
  location.alarm_code = alarm_code;
  location.access_parking_notes = access_parking_notes;
  location.additional_notes = additional_notes;
  location.photos = photos;

  // save location
  await location.save();

  // find profile
  const profile = await Profile.findOne({ user: req.user._id })
    .populate("locations")
    .populate("pets");

  // return profile
  res.status(200).json(profile);
});

// @desc    Delete a location
// @route   DELETE /api/location/:id
// @access  Private
const deleteLocation = asyncHandler(async (req, res) => {
  // find location
  const location = await Location.findOne({ _id: req.params.id });

  // check if user owns location or is admin
  if (req.user._id !== location.user.toString() && req.user.role !== "admin") {
    return res.status(401).json({ msg: "Not authorized" });
  }

  // remove location
  await location.remove();

  // find profile
  const profile = await Profile.findOne({ user: req.user._id })
    .populate("locations")
    .populate("pets");

  // return profile
  res.status(200).json(profile);
});

module.exports = {
  getMyLocations,
  addLocation,
  updateLocation,
  deleteLocation,
};
