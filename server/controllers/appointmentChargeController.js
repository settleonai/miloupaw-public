const asyncHandler = require("express-async-handler");
const appointmentModel = require("../../models/appointmentModel");
const businessProfileModel = require("../../models/businessProfileModel");
const profileModel = require("../../models/profileModel");
const { USER_PROJECTION_PUBLIC } = require("../config/projections");

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

// @desc    make setup intent
// @route   POST /appointment/setup-intent
// @access  Private
exports.createSetupIntent = asyncHandler(async (req, res) => {
  try {
    const clientProfile = await profileModel.findOne({ user: req.user._id });
    const customer = clientProfile?.business_info.customer_id;
    if (!customer) {
      return res.status(404).json({
        success: false,
        error: "Client profile not found",
      });
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer,
      type: "card",
    });

    if (paymentMethods.data.length === 0) {
      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer },
        { apiVersion: "2020-08-27" }
      );

      const setupIntent = await stripe.setupIntents.create({
        customer,
      });

      res.status(200).json({
        success: true,
        result: {
          setupIntent: setupIntent.client_secret,
          ephemeralKey: ephemeralKey.secret,
          customer,
          publishableKey:
            "pk_test_51JMeQ3JcaWhyBqHZq14PHdKNDMzCWtagNIG6pGjnKmIkai1wBwBTIBPyWQ0bRXAgj29uZw2bEFFmnWU9Nbvkxtl200f3lihV8V",
        },
      });
    } else {
      res.json({
        success: true,
        message: "Payment method already exists",
      });
    }
  } catch (error) {
    console.log("createPaymentIntent", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    make payment intent
// @route   POST /appointment/payment-intent
// @access  Private
exports.createPaymentIntent = asyncHandler(async (req, res, apt) => {
  try {
    let appointment;
    if (!apt) {
      const { appointmentId } = req.body;
      appointment = await appointmentModel.findById(appointmentId);
    } else {
      appointment = apt;
    }

    const clientProfile = await profileModel
      .findOne({
        user: appointment.client,
      })
      .populate("user", "name email");

    const customer = clientProfile.business_info.customer_id;

    const paymentMethods = await stripe.paymentMethods.list({
      customer,
      type: "card",
    });

    const { amount, currency } = appointment.payment;

    console.log("amount, currency", amount, currency);
    console.log("paymentMethods", paymentMethods);
    console.log(
      "(amount.total * 100).toFixed(0)",
      +(amount.total * 100).toFixed(0)
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: +(amount.total * 100).toFixed(0),
      currency: currency.toLowerCase(),
      customer,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
      metadata: {
        client: clientProfile.user.toString(),
        tip: amount.tip,
        appointment: appointment._id,
      },
      receipt_email: clientProfile.user.email,
    });
    console.log("paymentIntent", paymentIntent);
    if (paymentIntent.status === "succeeded") {
      appointment.payment.intent.id = paymentIntent.id;
      appointment.payment.intent.status = "received";

      await appointment.save();

      return res.status(200).json({
        success: true,
        result: {
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          id: paymentIntent.id,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        error: paymentIntent.status,
      });
    }
  } catch (error) {
    console.log("Error code is: ", error.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
      error.raw.payment_intent.id
    );
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
});
