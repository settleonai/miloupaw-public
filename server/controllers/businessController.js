const asyncHandler = require("express-async-handler");
const appointmentModel = require("../../models/appointmentModel");
const businessProfileModel = require("../../models/businessProfileModel");
const Profile = require("../../models/profileModel");
const userModel = require("../../models/userModel");
const {
  PET_GENERAL_PROJECTION,
  USER_PROJECTION_PUBLIC,
  EMPLOYEE_SELF_BUSINESS_PROFILE,
} = require("../config/projections");
const { baseFeesCalc, incomeCalc } = require("../utils/FinancialCalc");

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

const baseUrl = process.env.BASE_URL;

// @desc    Get list applicants
// @route   GET /business/applicants/
// @access  Admin Private
exports.getApplicants = asyncHandler(async (req, res) => {
  console.log("getApplicants");
  try {
    const businessProfiles = await businessProfileModel
      .find({
        $or: [{ status: "pending" }, { status: "rejected" }],
      })
      .populate("user", "name email pictures");

    res.status(200).json({
      success: true,
      count: businessProfiles.length,
      result: businessProfiles,
    });
  } catch (error) {
    console.log("getApplicants || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Respond to applicant
// @route   PUT /business/applicants/:id
// @access  Admin Private
exports.respondToApplicant = asyncHandler(async (req, res) => {
  try {
    const businessProfile = await businessProfileModel.findById(req.params.id);
    // console.log("businessProfile", businessProfile);

    if (!businessProfile) {
      return res.status(400).json({
        success: false,
        error: "Business profile not found",
      });
    }

    if (businessProfile.status === "approved") {
      return res.status(400).json({
        success: false,
        error: "Business profile already approved",
      });
    }

    if (businessProfile.status === "rejected") {
      return res.status(400).json({
        success: false,
        error: "Business profile already rejected",
      });
    }

    if (businessProfile.status === "pending") {
      if (req.body.status === "approve") {
        businessProfile.status = "approved";
        businessProfile.interviewer = req.user.id;
        businessProfile.interview_dateTime = new Date();
        await businessProfile.save();
      } else if (req.body.status === "reject") {
        businessProfile.status = "rejected";
        await businessProfile.save();
      }
    }

    return res.status(200).json({
      success: true,
      result: businessProfile,
    });
  } catch (error) {
    console.log("respondToApplicant || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Get list employees
// @route   GET /business/employees/
// @access  Admin Private
exports.getEmployees = asyncHandler(async (req, res) => {
  console.log("getEmployees");
  try {
    const businessProfiles = await businessProfileModel
      .find({
        $and: [{ status: "approved" }],
      })
      .populate("user", "name email pictures");

    res.status(200).json({
      success: true,
      count: businessProfiles.length,
      result: businessProfiles,
    });
  } catch (error) {
    console.log("getEmployees || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Get available employees for an appointment
// @route   GET /business/available-employees/
// @access  Admin Private
exports.getAvailableEmployees = asyncHandler(async (req, res) => {
  console.log("getAvailableEmployees");
  try {
    const { appointmentId, startDate, endDate } = req.query;

    // find appointments within the time range of startDate and endDate and exclude the appointmentId
    console.log("endDate", endDate);
    const appointments = await appointmentModel.find({
      $and: [
        { "time.start": { $lt: endDate }, "time.end": { $gt: startDate } },
        { _id: { $ne: appointmentId } },
      ],
    });

    console.log("getAvailableEmployees || appointments", appointments);

    // find all employees that are not in the appointments array
    const employees = await userModel.find(
      {
        $and: [
          { status: "approved" },
          {
            _id: {
              $nin: appointments.map((appointment) => appointment.employee),
            },
          },
        ],
      },
      USER_PROJECTION_PUBLIC
    );

    res.status(200).json({
      success: true,
      count: employees.length,
      result: employees,
    });
  } catch (error) {
    console.log("getAvailableEmployees || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Get Client Profile
// @route   GET /business/client-profile/:id
// @access  Employee Private
exports.getClientProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findOne(
      { user: id },
      {
        business_info: 0,
      }
    )
      .populate("locations")
      .populate("pets", PET_GENERAL_PROJECTION)
      .populate("user", "name email pictures");
    // console.log("profile", profile);
    if (!profile) {
      return res.status(400).json({
        success: false,
        error: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      result: profile,
    });
  } catch (error) {
    console.log("getClientProfile || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Get Employee Profile
// @route   GET /business/employee-profile/:id
// @access  Employee Private
exports.getEmployeeProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log("getEmployeeProfile", id);
  try {
    const businessProfile = await businessProfileModel.findOne(
      { user: id },
      EMPLOYEE_SELF_BUSINESS_PROFILE
    );
    if (!businessProfile) {
      return res.status(400).json({
        success: false,
        error: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      result: businessProfile,
    });
  } catch (error) {
    console.log("getEmployeeProfile || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Search Business Profile
// @route   GET /business/search/:keyword
// @access  Admin Private
exports.searchBusinessProfile = asyncHandler(async (req, res) => {
  console.log("searchBusinessProfile", req.body.query);
  let searchPattern = new RegExp(`^${req.body.query}`);

  try {
    const businessProfiles = await businessProfileModel
      .find({
        // $or: [
        //   { status: "approved" },
        //   { status: "rejected" },
        //   { status: "pending" },
        // ],
        // $text: {
        //   $regex: searchPattern,
        //   $options: "i",
        // },
        $or: [
          { first_name: { $regex: searchPattern, $options: "i" } },
          { last_name: { $regex: searchPattern, $options: "i" } },
        ],
      })
      .populate("user", "name email pictures");

    res.status(200).json({
      success: true,
      count: businessProfiles.length,
      result: businessProfiles,
    });
  } catch (error) {
    console.log("searchBusinessProfile || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Get Stripe Setup Link
// @route   GET /business/stripe-setup-link/
// @access  Employee Private
exports.getStripeAccountLink = asyncHandler(async (req, res) => {
  // profile
  const user = req.user;
  try {
    const business = await businessProfileModel.findOne(
      {
        user: user.id,
      },
      {
        "stripe.id": 1,
        "stripe.business_type": 1,
        "stripe.external_account": 1,
        "stripe.login_links": 1,
      }
    );

    // check if business profile has stripe id
    if (business.stripe?.id) {
      // get existing stripe account
      account = await stripe.accounts.retrieve(business.stripe.id);
      if (!account) {
        return res.status(400).json({
          success: false,
          error:
            "couldn't find any account based on your business profile. Please contact support at: " +
            process.env.SUPPORT_EMAIL,
        });
      }
      // console.log("account", account);
      business.stripe.charges_enabled = account.charges_enabled;
      business.stripe.capabilities.transfers = account.capabilities.transfers;
      business.stripe.capabilities.card_payments =
        account.capabilities.card_payments;
      await business.save();

      if (account.details_submitted === true) {
        const loginLink = await stripe.accounts.createLoginLink(account.id);
        return res.status(200).json({
          success: true,
          result: { login: loginLink },
        });
      }
    } else {
      // create a new stripe account
      account = await stripe.accounts.create({
        country: business.address.country || "US",
        type: "express",
        email: user.email,
        default_currency: business.stripe?.currency || "USD",
        business_type: "individual",
        business_profile: {
          product_description: "miloupaw employee",
          mcc: "7299",
        },
      });

      if (account) {
        let stripeModel = {
          id: account.id,
          business_type: account.business_type,
          created: account.created * 1000,
          external_account: account.external_accounts.url,
          login_links: account.login_links.url,
          capabilities: {
            transfers: account.capabilities.transfers,
            card_payments: account.capabilities.card_payments,
          },
          currency: account.default_currency.toUpperCase(),
        };

        // update business profile
        business.stripe = { ...business.stripe, ...stripeModel };
        await business.save();
        // console.log("account from stripe account:", account);
      }
    }

    // generate account links
    const accountLinks = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${baseUrl}/employee-profile/business`,
      return_url: `${baseUrl}/employee-profile/business`,
      type: "account_onboarding",
    });

    return res.status(200).json({
      success: true,
      result: { accountLinks },
    });
  } catch (error) {
    console.log("getStripeSetupLink || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Get Base Fees
// @route   GET /business/base-fees/
// @access  Employee Private
exports.getBaseFees = asyncHandler(async (req, res) => {
  // profile
  const user = req.user;
  try {
    const { generalCuts, share } = await baseFeesCalc(user.id);

    return res.status(200).json({
      success: true,
      result: { generalCuts, share },
    });
  } catch (error) {
    console.log("getBaseFees || error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Pay Employees for Completed Appointments
exports.payEmployeesCompletedAppointments = asyncHandler(async () => {
  try {
    const appointments = await appointmentModel.find({
      status: "COMPLETED",
      "payment.status": "received",
    });

    let paidAppointments = [];

    appointments.forEach(async (appointment) => {
      // check if 1 day has passed from appointment end date
      const endDate = new Date(appointment.time.end);
      const oneDayPassed = endDate.getTime() - Date.now() < 86400000;

      if (oneDayPassed) {
      }
      console.log("appointment.id", appointment._id);
      const business = await businessProfileModel.findOne({
        user: appointment.employee,
      });
      console.log("business.stripe.id", business.stripe.id);

      const transferAmount = await incomeCalc(appointment);

      if (business.stripe?.id) {
        const transfer = await stripe.transfers.create({
          amount: transferAmount.income * 100,
          currency: business.stripe.currency,
          source_transaction: appointment.payment.charge.id,
          destination: business.stripe.id,
          description: `employee payment for appointment #${appointment.id}`,
        });

        // console.log("transfer", transfer);

        appointment.payment.transfer = {
          id: transfer.id,
          amount: transfer.amount,
          balance_transaction: transfer.balance_transaction,
          created: transfer.created,
          currency: transfer.currency.toUpperCase(),
          description: transfer.description,
          destination: transfer.destination,
          destination_payment: transfer.destination_payment,
        };

        appointment.payment.status = "transferred";
        await appointment.save();

        paidAppointments.push(appointment);
      }
    });

    // console.log(
    //   "appointments.payment",
    //   appointments.map((apt) => apt.payment)
    // );
    return paidAppointments;
  } catch (error) {
    console.log("payoutCompletedAppointments || error", error);
    throw error;
  }
});

// @desc    Payout Completed Appointments
exports.payoutCompletedAppointments = asyncHandler(async () => {
  try {
    const appointments = await appointmentModel.find({
      status: "COMPLETED",
      "payment.status": "transferred",
    });

    let paidAppointments = [];

    appointments.forEach(async (appointment) => {
      const balance = await stripe.balance.retrieve();
      const availableBalance = balance.available[0].amount;
      const { companyCommission } = await incomeCalc(appointment);
      if (availableBalance > companyCommission) {
        const payout = await stripe.payouts.create({
          amount: companyCommission * 100,
          currency: "usd",
          source_type: "balance",
          description: `bank transfer for appointment #${appointment.id}`,
        });

        appointment.payment.payout = {
          id: payout.id,
          amount: payout.amount,
          balance_transaction: payout.balance_transaction,
          arrival_date: payout.arrival_date,
          created: payout.created,
          currency: payout.currency.toUpperCase(),
          description: payout.description,
          destination: payout.destination,
        };
        appointment.payment.status = "paid_out";
        await appointment.save();

        paidAppointments.push(appointment);
      }
    });

    return paidAppointments;
  } catch (error) {
    console.log("payoutCompletedAppointments || error", error);
    throw error;
  }
});
