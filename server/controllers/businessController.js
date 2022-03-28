const asyncHandler = require("express-async-handler");
const businessProfileModel = require("../../models/businessProfileModel");
const User = require("../../models/userModel");

// @desc    Get list applicants
// @route   GET /business/applicants/
// @access  Admin Private
exports.getApplicants = asyncHandler(async (req, res) => {
  console.log("getApplicants");
  try {
    const businessProfiles = await businessProfileModel
      .find({
        $and: [{ status: "pending" }],
      })
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      count: businessProfiles.length,
      result: businessProfiles,
    });
  } catch (error) {
    console.log("getApplicants || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Get list employees
// @route   GET /business/employees/
// @access  Admin Private
exports.getEmployees = asyncHandler(async (req, res) => {
  console.log("getEmployees");
  try {
    const businessProfiles = await businessProfileModel
      .find({
        $and: [{ status: "approved" }],
      })
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      count: businessProfiles.length,
      result: businessProfiles,
    });
  } catch (error) {
    console.log("getEmployees || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
