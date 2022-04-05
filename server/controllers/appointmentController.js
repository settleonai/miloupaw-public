const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");

const { sendTextMessage } = require("../utils/messager");
const Profile = require("../../models/profileModel");
const AdminProfile = require("../../models/adminProfileModel");
const MeetAndGreet = require("../../models/meetAndGreetModel");
const BusinessProfile = require("../../models/businessProfileModel");
const appointmentModel = require("../../models/appointmentModel");
const { SERVICES } = require("../utils/services");

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

// save customer info on payment
// https://stripe.com/docs/payments/save-during-payment

// @desc    Get list of Services
// @route   GET /appointment/services/
// @access  Private
exports.getServices = asyncHandler(async (req, res) => {
  try {
    const services = SERVICES;

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc    Create new Appointment
// @route   POST /appointment/
// @access  Private
exports.createAppointment = asyncHandler(async (req, res, next) => {
  try {
    const { type } = req.body;
    // console.log("createAppointment | req.body:", req.body);

    if (!type) {
      return res.status(400).json({
        success: false,
        error: "Please provide a type",
      });
    }
    if (type === "meet-and-greet") {
      handleMeetAndGreetRequest(req, res);
    }
    if (type === "meet_greet") {
      handleMeetAndGreetSetup(req, res);
    }
    if (type === "DOG_WALKING") {
      handleDogWalkingSetup(req, res);
    }
  } catch (error) {
    console.log("createAppointment", error);
  }
});

// @desc    Get list of Meet and Greet
// @route   GET /appointment/meet-greets
// @access  Private
exports.getMeetAndGreet = asyncHandler(async (req, res, next) => {
  try {
    // select only ongoing meet and greets
    const meetAndGreets = await MeetAndGreet.find({
      $nor: [{ status: "rejected" }, { status: "accepted" }],
    })
      .populate("client", "name email pictures")
      .populate("employee", "name email pictures");

    // // find profile of all clients
    // const profiles = await Profile.find({
    //   user: { $in: meetAndGreets.map((meetAndGreet) => meetAndGreet.client) },
    // });

    res.status(200).json({
      success: true,
      count: meetAndGreets.length,
      result: meetAndGreets,
    });
  } catch (error) {
    console.log("getMeetAndGreet", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Create a Payment Intent
// @route   POST /appointment/payment/intent
// @access  Private
exports.createPaymentIntent = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  try {
    const appointment = await appointmentModel.findById(id);

    const clientProfile = await Profile.findOne({ user: req.user._id });
    const customer = clientProfile?.business_info.customer_id;
    if (!customer) {
      return next(new ErrorResponse("Client profile not found", 404));
    }
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer },
      { apiVersion: "2020-08-27" }
    );
    // const amount = (parseFloat(req.body.amount.total) * 100).toFixed(0);

    const { amount, currency } = appointment.payment;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: (amount.total * 100).toFixed(0),
      currency: currency.toLowerCase(),
      customer,
      automatic_payment_methods: {
        enabled: true,
      },
      // application_fee_amount: 123,
      // transfer_data: {
      //   destination: "{{CONNECTED_ACCOUNT_ID}}",
      // },

      metadata: {
        client: clientProfile._id,
        appointments: [],
        tip: amount.tip,
        appointment: appointment._id,
      },
      receipt_email: req.user.email,
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:
        "pk_test_51JMeQ3JcaWhyBqHZq14PHdKNDMzCWtagNIG6pGjnKmIkai1wBwBTIBPyWQ0bRXAgj29uZw2bEFFmnWU9Nbvkxtl200f3lihV8V",
    });
  } catch (error) {
    console.log("createPaymentIntent", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// handle meet and greet request
const handleMeetAndGreetRequest = asyncHandler(async (req, res) => {
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

// handle meet and greet setup
const handleMeetAndGreetSetup = asyncHandler(async (req, res) => {
  // return console.log("handleMeetAndGreetSetup | req.body:", req.body);
  try {
    const { meetGreet, employee, client, time, notes } = req.body;
    const meetAndGreetObj = await MeetAndGreet.findById(meetGreet);
    const clientProfile = await Profile.findOne({ user: client }).populate(
      "locations"
    );
    const employeeProfile = await BusinessProfile.findOne({ user: employee });

    if (!meetAndGreetObj) {
      return res.status(400).json({
        success: false,
        error: "Meet and greet appointment not found",
      });
    }

    if (!clientProfile) {
      return res.status(400).json({
        success: false,
        error: "Client profile not found",
      });
    }

    if (!employeeProfile) {
      return res.status(400).json({
        success: false,
        error: "Employee profile not found",
      });
    }

    // console.log("handleMeetAndGreetSetup | meetAndGreetObj:", meetAndGreetObj);
    // console.log("handleMeetAndGreetSetup | clientProfile:", clientProfile);
    // console.log("handleMeetAndGreetSetup | employeeProfile:", employeeProfile);

    let startTime = new Date(time);

    const appointment = await appointmentModel.create({
      client: clientProfile.user,
      employee: employeeProfile.user,
      type: "MEE_AND_GREET",
      location: clientProfile.locations[0]._id,
      pets: clientProfile.pets,
      time: {
        start: startTime,
        // add 30 minutes to start time
        end: new Date(startTime.getTime() + 30 * 60000),
      },
      notes,
      status: "ASSIGNED",
      payment: {
        amount: 0,
      },
    });

    // console.log("handleMeetAndGreetSetup | appointment:", appointment);

    meetAndGreetObj.appointment_id = appointment._id;
    meetAndGreetObj.status = "assigned";

    await meetAndGreetObj.save();

    employeeProfile.appointments.push(appointment);
    await employeeProfile.save();

    // console.log("handleMeetAndGreetSetup | meetAndGreetObj:", meetAndGreetObj);

    return res.status(200).json({
      success: true,
      message: "Meet and greet appointment setup successfully",
      result: appointment,
    });
  } catch (error) {
    console.log("handleMeetAndGreetSetup | error", error);
  }
});

// handle dog walking setup
const handleDogWalkingSetup = asyncHandler(async (req, res) => {
  try {
    // return console.log("handleDogWalkingSetup | req.body:", req.body);
    const { type, location, pets, time, amount } = req.body;
    const client = req.user;
    const petsList = pets.map((pet) => pet._id);
    const appointment = await appointmentModel.create({
      client,
      type,
      location: location._id,
      pets: petsList,
      time,
      payment: {
        amount,
      },
      status: "READY_TO_PAY",
    });

    return res.status(200).json({
      success: true,
      message: "Dog walking appointment setup successfully",
      result: appointment,
    });
  } catch (error) {
    console.log("handleDogWalkingSetup | error", error);
    return res.status(400).json({
      success: false,
      error: "Internal server error. Please contact support",
    });
  }
});
