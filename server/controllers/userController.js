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
const BusinessProfile = require("../../models/businessProfileModel");

// defaults
const baseUrl = process.env.BASE_URL;
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
  const { user, profile } = await createCustomerUser(
    {
      name,
      email,
      password: hashedPassword,
      pictures: [picture || defaultPicture],
      provider: "miloupaw",
    },
    {
      first_name,
      last_name,
    }
  );

  // customer profile for stripe:
  // stripe.com/docs/api/customers/create?lang=node#create_customer-description

  if (user) {
    res.status(201).json({ user, profile });
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
  const profile = await Profile.findOne({ user: req.user.id })
    .populate("locations")
    .populate("pets");

  res.status(200).json(profile);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateMyProfile = asyncHandler(async (req, res) => {
  try {
    let profile;
    if (req.user.role === "client") {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        {
          new: true,
        }
      );
    } else {
      profile = await BusinessProfile.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true }
      );
    }
    await User.findByIdAndUpdate(req.user.id, {
      name: req.body.first_name + " " + req.body.last_name,
    });

    res.status(200).json({
      success: true,
      result: profile,
    });
  } catch (error) {
    console.log("profile updating error", error);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Update user's business profile
// @route   PUT /api/users/business-profile
// @access  Private
const updateMyBusinessProfile = asyncHandler(async (req, res) => {});

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
      const { user, profile } = await createCustomerUser(
        {
          name: googleUser.name,
          email: googleUser.email,
          password: null,
          pictures: [googleUser.picture || defaultPicture],
          googleId: googleUser.sub,
          email_verified: googleUser.email_verified,
          provider: "google",
        },
        {
          first_name: googleUser.given_name,
          last_name: googleUser.family_name,
        }
      );

      console.log("user || profile", user, profile);

      return res.status(200).json({ user, profile });
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
      const { user, profile } = await createCustomerUser(
        {
          name: first_name + " " + last_name,
          email: appleUser.email,
          password: null,
          pictures: [picture || defaultPicture],
          appleId: appleUser.sub,
          email_verified: appleUser.email_verified,
          provider: "apple",
        },
        {
          first_name,
          last_name,
        }
      );

      return res.status(200).json({ user, profile });
    });
  } catch (error) {
    console.log(error);
  }
});

// @desc    submit a job application
// @route   POST /api/users/jobApplication
// @access  Public
const jobApplication = asyncHandler(async (req, res) => {
  const {
    token,
    platform,
    email,
    first_name,
    last_name,
    phone,
    photos,
    gender,
    birth_date,
    address,
    good_with_dogs,
    good_with_cats,
    good_with_other_pets,
    notes,
    commute_method,
    maximum_commute_distance,
    driving_license,
    authorized_to_work_in_us,
    years_of_experience,
  } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const decodedToken = jwt.decode(token);

  try {
    let user;
    let profile;
    // check if token is equal to googleId or appleId
    user = await User.findOne({
      $or: [{ googleId: decodedToken.sub }, { appleId: decodedToken.sub }],
    });

    if (!user) {
      const userObj = {
        name: `${first_name} ${last_name}`,
        email: decodedToken.email,
        email_verified: decodedToken.email_verified,
        provider: platform,
        pictures: photos,
      };
      if (platform === "google") {
        userObj.googleId = decodedToken.sub;
      } else {
        userObj.appleId = decodedToken.sub;
      }

      user = await createUser(userObj, "employee");
    }
    profile = await BusinessProfile.findOne({ user: user._id });

    if (!profile) {
      const profileObj = {
        user: user._id,
        first_name,
        last_name,
        phone_number: phone,
        gender,
        birth_date,
        address,
        good_with_dogs,
        good_with_cats,
        good_with_other_pets,
        notes,
        commute_method,
        maximum_commute_distance,
        driving_license,
        authorized_to_work_in_us,
        years_of_experience,
      };

      profile = await createBusinessProfile(profileObj);
    }
    if (user && profile) {
      return res.status(200).json({ user, profile });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
    throw new Error(error.message);
  }
});

// @desc    Get my business profile
// @route   GET /api/users/businessProfile
// @access  Private
const getMyBusinessProfile = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const profile = await BusinessProfile.findOne({ user: user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.log("getMyBusinessProfile error", error);
    return res.status(400).json({ message: error.message });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// create new user
const createUser = async (userObject, role) => {
  try {
    // generate random password if not exists
    if (!userObject.password) {
      userObject.password = generatePassword();
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userObject.password, salt);

    // create new user object
    const user = await User.create({
      ...userObject,
      role,
      password: hashedPassword,
    });
    const access_token = generateToken(user._id);
    user.access_token = access_token;
    user.token_exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
    user.save();

    return user;
  } catch (error) {
    console.log("user creating error", error);
    throw new Error(error.message);
  }
};

// Create a new customer user
const createCustomerUser = async (userObject, profileObject) => {
  try {
    const user = await createUser(userObject, "client");

    // create profile
    const profile = await createClientProfile(user, profileObject);

    // send mail
    const client = [[user.email, profile.first_name]];
    const tags = {
      first_name: profile.first_name,
      email_verification_link: `${baseUrl}/verify/email?token=${"token"}&userId=${
        user._id
      }`,
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

    return { user, profile };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// check if social user is exist and return user data
const checkSocialUser = async (email, res, next) => {
  const user = await User.findOne({ email: email });
  if (user) {
    let profile, businessProfile;
    if (user.role === "client") {
      profile = await Profile.findOne({ user: user._id })
        .populate("locations")
        .populate("pets");
    } else {
      businessProfile = await BusinessProfile.findOne({ user: user._id });
    }
    const access_token = generateToken(user._id);
    user.access_token = access_token;
    user.token_exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
    user.save();

    return res.status(200).json({ user, profile, businessProfile });
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

// create profile for business
async function createBusinessProfile(profileObject) {
  console.log("profileObject", profileObject);

  try {
    const businessProfile = await BusinessProfile.create(profileObject);

    console.log("businessProfile", businessProfile);

    return businessProfile;
  } catch (error) {
    console.log("businessProfile Error", error);
    throw new Error(error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getMyBusinessProfile,
  updateMyProfile,
  updateMyBusinessProfile,
  googleAuth,
  appleAuth,
  createClientProfile,
  jobApplication,
};
