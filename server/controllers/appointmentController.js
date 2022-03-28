const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");

const { sendTextMessage } = require("../utils/messager");
const Profile = require("../../models/profileModel");
const AdminProfile = require("../../models/adminProfileModel");
const MeetAndGreet = require("../../models/meetAndGreetModel");
const BusinessProfile = require("../../models/businessProfileModel");

// save customer info on payment
// https://stripe.com/docs/payments/save-during-payment

// @desc    Create new Appointment
// @route   POST /api/appointment/
// @access  Private
exports.createAppointment = asyncHandler(async (req, res, next) => {
  try {
    const { type } = req.body;
    console.log("createAppointment | req.body:", req.body);

    if (!type) {
      return next(new ErrorResponse("Please provide a type", 400));
    }
    if (type === "meet-and-greet") {
      handleMeetAndGreet(req, res, next);
    }
  } catch (error) {
    console.log("createAppointment", error);
  }
});

// handle meet and greet
const handleMeetAndGreet = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;
    const profile = await Profile.findOne({ user: user._id });

    const admin = await User.findOne({ role: "admin" });
    const adminProfile = await BusinessProfile.findOne({ user: admin._id });
    let adminBusinessProfile = await AdminProfile.findOne({
      user: admin._id,
    });

    // console.log("profile admin.user.toString()", user.id, admin.id);

    if (!profile) {
      return res.status(400).json({
        success: false,
        error: "Please complete your profile",
      });
    }

    if (!adminBusinessProfile) {
      adminBusinessProfile = await AdminProfile.create({
        user: admin._id,
      });
    }

    // console.log("adminBusinessProfile", adminBusinessProfile);
    // console.log("adminProfile", adminProfile);
    if (!adminProfile || !adminBusinessProfile) {
      return res.status(400).json({
        success: false,
        error: "Internal server error. Please contact support",
      });
    }

    // const messageToAdmin = await sendTextMessage(
    //   `${profile.first_name} ${profile.last_name} has requested a meet and greet appointment. Please reach out via following phone number: \n
    //   +1 ${profile.phone_number}`,
    //   `+1 ${adminProfile.phone_number}`
    // );
    // const messageToUser = await sendTextMessage(
    //   `Your request for a meet and greet appointment has been sent to ${adminProfile.first_name} at +1 ${adminProfile.phone_number}. Our colleague will reach out to you within a business day. Please wait for a response. Thank you!`,
    //   `+1 ${profile.phone_number}`
    // );

    const meet_and_greet = await MeetAndGreet.create({
      client: profile.user,
      admin: adminProfile.user,
      status: "requested",
      appointment_id: null,
    });

    // console.log("meet_and_greet", profile);
    profile.meet_and_greet = meet_and_greet._id;
    await profile.save();

    // const profile = await Profile.findOneAndUpdate(
    //   { user: req.user.id },
    //   { $push: { locations: location._id } },
    //   { new: true }
    // )
    //   .populate("locations")
    //   .populate("pets");

    adminBusinessProfile.meet_and_greets.push(meet_and_greet);
    await adminBusinessProfile.save();

    return res.status(200).json({
      success: true,
      message: "Meet and greet appointment request sent to admin",
      result: {
        contact: {
          name: adminProfile.first_name,
          phone: adminProfile.phone_number,
        },
        profile,
      },
    });
  } catch (error) {
    console.log("handleMeetAndGreet | error", error);
  }
});
