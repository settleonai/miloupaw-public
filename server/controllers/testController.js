const asyncHandler = require("express-async-handler");
const businessProfileModel = require("../../models/businessProfileModel");
const profileModel = require("../../models/profileModel");
const userModel = require("../../models/userModel");
const appointmentModel = require("../../models/appointmentModel");
const {
  sendPushNotification,
  sendPushNotificationToAdmins,
} = require("../utils/pushNotification");
const { sendMail } = require("../utils/mail");
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

// @desc    Get user pets
// @route   GET /api/pets/
// @access  Private
exports.testCommand = async (req, res) => {
  try {
    const appointment = await appointmentModel.findById(
      "62d4775a71961fd409e4575e"
    );
    // console.log("appointment", appointment);
    if (!appointment) {
      return res.status(400).json({
        success: false,
        message: "Appointment not found",
      });
    }
    const clientProfile = await profileModel
      .findOne({ user: appointment.client })
      .populate("user")
      .populate("pets");

    // return res.status(200).json({
    //   success: true,
    //   message: "Appointment found",
    //   appointment,
    //   clientProfile,
    // });

    // meetAndGreet.status = "COMPLETED";
    // await meetAndGreet.save();

    // return res.status(200).json({
    //   success: true,
    //   message: "Appointment found",
    //   token: clientProfile.user.push_token,
    // });

    // send welcome notification to client
    await sendPushNotification(
      [clientProfile.user.push_token],
      "Welcome",
      "Welcome to Miloupaw! Your account has been activated"
    );

    // send welcome notification to admins
    // sendPushNotificationToAdmins(
    //   "Client Account Activated",
    //   `${clientProfile.last_name}'s profile has been activated`
    // );

    // send welcome email to client
    const client = [[clientProfile.user.email, clientProfile.first_name]];
    const tags = {
      first_name: clientProfile.first_name || "",
      pets_name: clientProfile.pets.map((pet) => pet.name).join(", ") || "",
    };
    await sendMail(
      "activated_account",
      client,
      tags,
      "🥳 your miloupaw account has been activated 🎉"
    );
    return res.status(200).json({
      success: true,
      message: "Appointment found",
    });
  } catch (err) {
    console.log(err);
  }
};
