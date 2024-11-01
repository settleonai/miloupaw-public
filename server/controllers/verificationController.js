const asyncHandler = require("express-async-handler");
const businessProfileModel = require("../../models/businessProfileModel");
const profileModel = require("../../models/profileModel");
const { createClientProfile } = require("./userController");

// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require("twilio")(accountSid, authToken);

const sendVerificationNumber = asyncHandler(async (req, res) => {
  try {
    let { phoneNumber } = req.body;
    const user = req.user;

    let profile;

    if (user.role === "client") {
      profile = await profileModel.findOne({ user: user._id });
    } else {
      profile = await businessProfileModel.findOne({ user: user._id });
    }

    if (!profile.phone_number && !phoneNumber) {
      res.status(400).json("Please add your phone number");
    }
    profile.phone_number = phoneNumber;
    await profile.save();

    // Send SMS
    await client.verify.services(serviceSid).verifications.create({
      to: `+1 ${profile.phone_number}`,
      channel: "sms",
    });

    return res
      .status(200)
      .json({ verification: "verification code sent to " + phoneNumber });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

const verifyPhoneNumber = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const user = req.user;
  try {
    let profile;

    if (user.role === "client") {
      profile = await profileModel.findOne({ user: user._id });
    } else {
      profile = await businessProfileModel.findOne({ user: user._id });
    }

    const verification = await client.verify
      .services(serviceSid)
      .verificationChecks.create({ code, to: `+1 ${profile.phone_number}` });

    // console.log("verification phone check:", verification);
    if (verification.status === "approved") {
      profile.phone_verified = true;
      await profile.save();
      return res.status(200).json({
        verification: `phone number ${profile.phone_number} verified.`,
        profile,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(error({ server: err.message }, res.statusCode));
  }
});

module.exports = {
  sendVerificationNumber,
  verifyPhoneNumber,
};
