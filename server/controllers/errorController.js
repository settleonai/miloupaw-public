const asyncHandler = require("express-async-handler");
const errorModel = require("../../models/errorModel");

// @desc    record error
// @route   POST /api/error/
// @access  protected
exports.recordError = asyncHandler(async (req, res) => {
  //   return console.log("recordError", req.body);
  try {
    const { error, error_info } = req.body;
    const errorRecord = await errorModel.create({
      error,
      error_info,
    });
    res.status(201).json({
      success: true,
      result: errorRecord,
    });
  } catch (error) {
    console.log("recordError", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
