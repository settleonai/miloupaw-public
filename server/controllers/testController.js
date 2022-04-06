const asyncHandler = require("express-async-handler");
const businessProfileModel = require("../../models/businessProfileModel");
const profileModel = require("../../models/profileModel");
const userModel = require("../../models/userModel");
const appointmentModel = require("../../models/appointmentModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

// @desc    Get user pets
// @route   GET /api/pets/
// @access  Private
exports.testCommand = asyncHandler(async (req, res) => {
  try {
    const id = "624d139897dafb66bbb6988a";
    const appointment = await appointmentModel.findById(id);
    // console.log("appointment", appointment);

    const clientProfile = await profileModel.findOne({
      user: appointment.client,
    });

    const customer = await stripe.customers.retrieve(
      clientProfile.business_info.customer_id
    );

    console.log("clientProfile", clientProfile.business_info.customer_id);
    console.log("customer", customer);
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id,
      type: "card",
    });

    const { amount, currency } = appointment.payment;

    console.log("paymentMethods.data[0].id", paymentMethods);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: (amount.total * 100).toFixed(0),
      currency: currency.toLowerCase(),
      customer: clientProfile.business_info.customer_id,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
      metadata: {
        client: req.user._id,
        appointments: [],
        tip: amount.tip,
        appointment: appointment.id,
      },
      receipt_email: req.user.email,
    });

    console.log("paymentIntent", paymentIntent);
  } catch (error) {
    console.log("Error code is: ", err.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
      err.raw.payment_intent.id
    );
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
});
