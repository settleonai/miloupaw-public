const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const generatePassword = require("../utils/randomPassword");
const getAvatar = require("../utils/getAvatar");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const googleAuth = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  try {
    const googleUser = jwt.decode(token);

    if (!googleUser) {
      res.status(400);
      throw new Error("Google token is invalid");
    }
    if (!googleUser.sub) {
      res.status(400);
      throw new Error("Google token is invalid");
    }
    if (googleUser.exp < Date.now() / 1000) {
      res.status(400);
      throw new Error("Google token has expired");
    }

    // check if user exists, if not continue creating new user
    await checkSocialUser(googleUser.email, res, async () => {
      // generate random password and hash it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(generatePassword(), salt);

      // create new user
      const user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        password: hashedPassword,
        googleId: googleUser.sub,
        email_verified: googleUser.email_verified,
        first_name: googleUser.given_name,
        last_name: googleUser.family_name,
        picture: googleUser.picture,
        provider: "google",
        role: "client",
      });
      const access_token = generateToken(user._id);
      user.access_token = access_token;
      user.token_exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
      user.save();

      return res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        picture: user.picture,
        googleId: user.googleId,
        email_verified: user.email_verified,
        access_token,
        provider: user.provider,
        role: user.role,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

const appleAuth = asyncHandler(async (req, res) => {
  const { token, last_name, first_name } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  try {
    const appleUser = jwt.decode(token);
    if (!appleUser) {
      res.status(400);
      throw new Error("Apple token is invalid");
    }
    if (!appleUser.sub) {
      res.status(400);
      throw new Error("Apple token is invalid");
    }
    if (appleUser.exp < Date.now() / 1000) {
      res.status(400);
      throw new Error("Apple token has expired");
    }

    let picture = await getAvatar(appleUser.sub);

    // check if user exists, if not continue creating new user
    await checkSocialUser(appleUser.email, res, async () => {
      // generate random password and hash it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(generatePassword(), salt);

      // create new user
      const user = await User.create({
        name: first_name + " " + last_name,
        email: appleUser.email,
        password: hashedPassword,
        googleId: appleUser.sub,
        email_verified: appleUser.email_verified,
        first_name,
        last_name,
        picture,
        provider: "apple",
        role: "client",
      });
      const access_token = generateToken(user._id);
      user.access_token = access_token;
      user.token_exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
      user.save();

      return res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        picture: user.picture,
        googleId: user.googleId,
        email_verified: user.email_verified,
        access_token,
        provider: user.provider,
        role: user.role,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// check if social user is exist and return user data
const checkSocialUser = async (email, res, next) => {
  const user = await User.findOne({ email: email });
  if (user) {
    const access_token = generateToken(user._id);
    user.access_token = access_token;
    user.token_exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
    user.save();
    return res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      picture: user.picture,
      googleId: user.googleId,
      email_verified: user.email_verified,
      access_token,
      provider: user.provider,
      role: user.role,
    });
  } else {
    next();
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  googleAuth,
  appleAuth,
};
