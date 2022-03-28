const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  // console.log("##### protect #####", req.headers.authorization);
  const token = req.headers.authorization;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded token", decoded);

    // Get user from the token
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorized");
  }
});

const adminProtect = asyncHandler(async (req, res, next) => {
  // console.log("##### adminProtect #####", req.headers.authorization);
  const token = req.headers.authorization;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded token", decoded);

    // Get user from the token
    req.user = await User.findById(decoded.id).select("-password");

    if (req.user.role !== "admin") {
      res.status(401);
      throw new Error("Not authorized");
    }
    next();
  } catch (error) {
    console.log("adminProtect || error", error);
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect, adminProtect };
