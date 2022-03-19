const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// utilities
const getAvatar = require("../utils/getAvatar");
const { sendMail } = require("../utils/mail");
const generatePassword = require("../utils/randomPassword");

// models
const User = require("../../models/userModel");
const Profile = require("../../models/profileModel");

// defaults
const defaultPicture =
  "https://res.cloudinary.com/fnel/image/upload/v1634880347/avatar/default-avatar.jpg";

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, first_name, last_name, picture } = req.body;

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

  // Create user
  const user = await createCustomerUser(
    {
      name,
      email,
      password: hashedPassword,
      provider: "miloupaw",
    },
    {
      first_name,
      last_name,
      picture: picture || defaultPicture,
    }
  );

  // customer profile for stripe:
  // stripe.com/docs/api/customers/create?lang=node#create_customer-description

  if (user) {
    res.status(201).json(user);
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
  const user = await User.findOne({ email }).select("+password");

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
  const profile = await Profile.findOne({ user: req.user.id });
  res.status(200).json(profile);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateMyProfile = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);
  const { first_name, last_name } = req.body;
  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    {
      first_name,
      last_name,
    },
    { new: true }
  );

  res.status(200).json(profile);
});

// @desc    Register new user Signed in with Google
// @route   POST /api/users/googleAuth
// @access  Public
const googleAuth = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  try {
    const googleUser = jwt.decode(token);
    console.log(googleUser);

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
      // create new user
      const user = await createCustomerUser(
        {
          name: googleUser.name,
          email: googleUser.email,
          password: null,
          googleId: googleUser.sub,
          email_verified: googleUser.email_verified,
          provider: "google",
        },
        {
          first_name: googleUser.given_name,
          last_name: googleUser.family_name,
          picture: googleUser.picture || defaultPicture,
        }
      );

      return res.status(200).json(user);
    });
  } catch (error) {
    console.log(error);
  }
});

// @desc    Register new user Signed in with Apple
// @route   POST /api/users/appleAuth
// @access  Public
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
      // create new user
      const user = await createCustomerUser(
        {
          name: first_name + " " + last_name,
          email: appleUser.email,
          password: null,
          appleId: appleUser.sub,
          email_verified: appleUser.email_verified,
          provider: "apple",
        },
        {
          first_name,
          last_name,
          picture: picture || defaultPicture,
        }
      );

      return res.status(200).json(user);
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

// Create a new user
const createCustomerUser = async (userObject, profileObject) => {
  try {
    // generate random password if not exists
    if (!userObject.password) {
      userObject.password = generatePassword();
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userObject.password, salt);

    console.log("heeeeer", userObject);

    // create new user object
    const user = await User.create({
      ...userObject,
      password: hashedPassword,
      role: "client",
    });
    const access_token = generateToken(user._id);
    user.access_token = access_token;
    user.token_exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
    user.save();

    // create profile
    const profile = await createClientProfile(user, profileObject);

    // send mail
    const client = [[user.email, profile.first_name]];
    const tags = {
      first_name: profile.first_name,
      email_verification_link: `${baseUrl}/verify/email?token=${token}&userId=${user._id}`,
    };

    if (userObject.provider === "miloupaw") {
      await sendMail(
        `email-verification-${profile.gender === "female" ? "female" : "male"}`,
        client,
        tags,
        "one more step to become a fneller 🤩"
      );
    } else {
      await sendMail("welcome", client, tags, "welcome to miloupaw family 🐾");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
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

// create profile for client
async function createClientProfile(user, profileObject) {
  try {
    const profile = await Profile.create({ ...profileObject, user: user._id });

    // create stripe customer
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: {
        user: user._id,
      },
    });

    profile.business_info = {
      customer_id: customer.id,
      type: customer.object,
      activated: true,
    };

    profile.save();

    return profile;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateMyProfile,
  googleAuth,
  appleAuth,
  createClientProfile,
};
