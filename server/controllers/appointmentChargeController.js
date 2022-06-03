const asyncHandler = require("express-async-handler");
const appointmentModel = require("../../models/appointmentModel");
const businessProfileModel = require("../../models/businessProfileModel");
const profileModel = require("../../models/profileModel");
const {
  USER_PROJECTION_PUBLIC,
  EMPLOYEE_ADMIN_PROJECTION,
  EMPLOYEE_PUBLIC_PROJECTION,
} = require("../config/projections");

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
          publishableKey: process.env.STRIPE_API_KEY,
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

    console.log("clientProfile.user._id", clientProfile.user._id);
    console.log("appointment._id", appointment._id);
    console.log("clientProfile.user.email", clientProfile.user.email);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: +(amount.total * 100).toFixed(0),
      currency: currency.toLowerCase(),
      customer,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
      metadata: {
        client: clientProfile.user._id.toString(),
        tip: amount.tip,
        appointment: appointment._id.toString(),
      },
      receipt_email: clientProfile.user.email,
    });
    if (paymentIntent.status === "succeeded") {
      appointment.payment.intents.push({
        id: paymentIntent.id,
        status: "received",
        amount: +(paymentIntent.amount / 100).toFixed(2),
      });

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

// @desc    additional tip
// @route   POST /appointment/tip
// @access  Private
exports.setupAdditionalTip = asyncHandler(async (req, res) => {
  try {
    const { id, tip } = req.body;
    console.log("setupAdditionalTip", req.body);
    const appointment = await appointmentModel
      .findById(id)
      .populate("client", "name email");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found",
      });
    }

    const employeeProfile = await businessProfileModel.findOne(
      {
        user: appointment.employee,
      },
      EMPLOYEE_ADMIN_PROJECTION
    );

    const clientProfile = await profileModel.findOne({
      user: appointment.client,
    });

    const customer = clientProfile.business_info.customer_id;

    const paymentMethods = await stripe.paymentMethods.list({
      customer,
      type: "card",
    });

    const { currency } = appointment.payment;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: +(tip * 100).toFixed(0),
      currency: currency.toLowerCase(),
      customer,
      payment_method: paymentMethods.data[0].id,
      transfer_data: {
        destination: employeeProfile.stripe.id,
      },
      off_session: true,
      confirm: true,
      metadata: {
        client: appointment.client._id,
        tip,
        appointment: appointment._id,
        note: "additional tip",
      },
      receipt_email: appointment.client.email,
    });

    if (paymentIntent.status === "succeeded") {
      appointment.payment.amount.tip = +(
        appointment.payment.amount.tip + parseFloat(tip)
      ).toFixed(2);
      appointment.payment.amount.total = +(
        appointment.payment.amount.total + parseFloat(tip)
      ).toFixed(2);
      appointment.payment.off_session_tips.push({
        id: paymentIntent.id,
        status: "received",
        amount: +(paymentIntent.amount / 100).toFixed(2),
      });
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
    console.log("Error code is: ", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    pay bill difference
// @access  Admin
exports.chargeCustomer = async (appointment, bill, description) => {
  try {
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

    const { currency } = appointment.payment;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: +(bill * 100).toFixed(0),
      currency: currency.toLowerCase(),
      customer,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
      metadata: {
        client: clientProfile.user.toString(),
        appointment: appointment._id,
      },
      receipt_email: clientProfile.user.email,
      description,
    });

    if (paymentIntent.status === "succeeded") {
      appointment.payment.intents.push({
        id: paymentIntent.id,
        status: "received",
        amount: +(paymentIntent.amount / 100).toFixed(2),
      });

      await appointment.save();
    } else {
      console.log("paymentIntent.status: ", paymentIntent.status);
      throw new Error(paymentIntent.status);
    }
  } catch (error) {
    console.log("Error code is: ", error);
    throw new Error(error);
  }
};
