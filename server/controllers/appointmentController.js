const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");

const { sendTextMessage } = require("../utils/messager");
const Profile = require("../../models/profileModel");
const AdminProfile = require("../../models/adminProfileModel");
const MeetAndGreet = require("../../models/meetAndGreetModel");
const BusinessProfile = require("../../models/businessProfileModel");
const appointmentModel = require("../../models/appointmentModel");
const { SERVICES } = require("../utils/services");

const {
  PET_CARD_PROJECTION,
  LOCATION_CARD_PROJECTION,
  USER_PROJECTION_PUBLIC,
  APPOINTMENTS_LIST_PROJECTION_PUBLIC,
} = require("../config/projections");
const userModel = require("../../models/userModel");
const { createPaymentIntent } = require("./appointmentChargeController");
const journalModel = require("../../models/journalModel");
const {
  sendPushNotification,
  sendPushNotificationToAdmins,
} = require("../utils/pushNotification");
const { CAN_DO_APPOINTMENT } = require("../constants/userTypes");
const {
  incomeCalc,
  calculateAppointmentBaseFee,
} = require("../utils/FinancialCalc");
const reviewModel = require("../../models/reviewModel");
const { refundAppointment } = require("./businessController");
const claimModel = require("../../models/claimModel");
const messageModel = require("../../models/messageModel");

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

// @desc    Get list of Appointments
// @route   GET /appointment/
// @access  Employee or Admin
exports.getAppointments = asyncHandler(async (req, res) => {
  // console.log("query", req.query);
  try {
    const limit = parseInt(req.query.limit) || 20;
    const cursor = req.query.cursor;
    const status = req.query.status?.split(",") || [];
    const types = req.query.type?.split(",") || [];
    const self = Boolean(req.query.employee);
    const reqUserIsClient = Boolean(req.query.client);

    const employee = req.query.employee;

    let appointments;

    const { user } = req;

    console.log("self", self);

    let filters = {
      $and: [],
    };
    if (user.role === "admin" && employee) {
      filters["$and"].push({ employee: employee });
    }
    if (status.length) {
      filters["$and"].push({ status: { $in: status } });
    }
    if (types.length) {
      filters["$and"].push({ type: { $in: types } });
    }
    if (self) {
      filters["$and"].push({
        employee: user.id,
      });
    }
    if (reqUserIsClient) {
      filters["$and"].push({
        client: user.id,
      });
    }
    if (filters["$and"].length === 0) {
      delete filters["$and"];
    }

    if (cursor) {
      const decryptedCursorDate = DateTime.fromMillis(parseInt(cursor));
      filters["$and"].push({
        createdAt: {
          $lte: decryptedCursorDate.toJSDate(),
        },
      });
    }
    appointments = await appointmentModel
      .find(filters, APPOINTMENTS_LIST_PROJECTION_PUBLIC)
      .populate("employee", USER_PROJECTION_PUBLIC)
      .populate("pets", PET_CARD_PROJECTION)
      .sort({ "time.start": +1 })
      .limit(limit + 1);

    if (!appointments) {
      return res.status(404).json({
        success: false,
        error: "No appointments found",
      });
    }
    const appointmentsCount = await appointmentModel.countDocuments();

    const hasMore = appointments.length === limit + 1;
    let nextCursor = null;

    // assign cursor to next set's first element
    if (hasMore) {
      const nextCursorRecord = appointments[limit];
      nextCursor = nextCursorRecord.createdAt.getTime();
      appointments.pop();
    }

    let count = appointments.length;

    return res.status(200).json({
      success: true,
      totalCount: appointmentsCount,
      count,
      hasMore,
      nextCursor,
      result: appointments,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Get list of Client's Appointments
// @route   GET /appointment/client-appointments/
// @access  Client
exports.getClientAppointments = asyncHandler(async (req, res) => {
  // console.log("query", req.query);
  try {
    const limit = parseInt(req.query.limit) || 20;
    const cursor = req.query.cursor;
    const status = req.query.status?.split(",") || [];
    const types = req.query.type?.split(",") || [];
    const next = Boolean(req.query.next);
    const future = Boolean(req.query.future);

    let appointments;

    const { user } = req;

    let filters = {
      $and: [
        {
          client: user.id,
        },
      ],
    };
    if (status.length) {
      filters["$and"].push({ status: { $in: status } });
    }
    if (types.length) {
      filters["$and"].push({ type: { $in: types } });
    }

    if (future) {
      filters["$and"].push({
        "time.start": {
          $gte: new Date(),
        },
      });
    }

    if (next) {
      filters["$and"].push({
        $and: [
          {
            status: {
              $in: ["ASSIGNED", "PAID", "PENDING", "EXPIRED", "ONGOING"],
            },
          },
          {
            "time.start": {
              $gte: new Date(),
            },
          },
        ],
      });
    }

    if (filters["$and"].length === 0) {
      delete filters["$and"];
    }

    if (cursor) {
      const decryptedCursorDate = DateTime.fromMillis(parseInt(cursor));
      filters["$and"].push({
        createdAt: {
          $lte: decryptedCursorDate.toJSDate(),
        },
      });
    }
    appointments = await appointmentModel
      .find(filters)
      .populate("employee", USER_PROJECTION_PUBLIC)
      .populate("pets", PET_CARD_PROJECTION)
      .populate("location", LOCATION_CARD_PROJECTION)
      .sort({ "time.start": +1 })
      .limit(limit + 1);

    if (!appointments) {
      return res.status(404).json({
        success: false,
        error: "No appointments found",
      });
    }
    const appointmentsCount = await appointmentModel.countDocuments();

    const hasMore = appointments.length === limit + 1;
    let nextCursor = null;

    // assign cursor to next set's first element
    if (hasMore) {
      const nextCursorRecord = appointments[limit];
      nextCursor = nextCursorRecord.createdAt.getTime();
      appointments.pop();
    }

    let count = appointments.length;

    return res.status(200).json({
      success: true,
      totalCount: appointmentsCount,
      count,
      hasMore,
      nextCursor,
      result: appointments,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Get list of client's Appointment
// @route   GET /appointment/client-appointment/:id
// @access  Client
exports.getClientAppointment = asyncHandler(async (req, res) => {
  try {
    const appointment = await appointmentModel
      .findById(req.params.id)
      .populate("employee", USER_PROJECTION_PUBLIC)
      .populate("client", USER_PROJECTION_PUBLIC)
      .populate("location", LOCATION_CARD_PROJECTION)
      .populate("pets", PET_CARD_PROJECTION)
      .populate("journal")
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "User",
          select: USER_PROJECTION_PUBLIC,
        },
      });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "No appointment found",
      });
    }

    return res.status(200).json({
      success: true,
      result: appointment,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Get Appointment Details
// @route   GET /appointment/:id
// @access  Employee or Admin
exports.getAppointment = asyncHandler(async (req, res) => {
  const { user } = req;
  console.log("req.params", req.params);
  try {
    const appointment = await appointmentModel
      .findById(req.params.id)
      .populate("employee", USER_PROJECTION_PUBLIC)
      .populate("client", USER_PROJECTION_PUBLIC)
      .populate("location")
      .populate("pets", PET_CARD_PROJECTION)
      .populate("journal")
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "User",
          select: USER_PROJECTION_PUBLIC,
        },
      });

    // console.log("appointment", appointment);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "No appointment found",
      });
    }

    if (!user.role === "admin" && appointment.employee.id !== user.id) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }
    const returnObject = {
      ...appointment._doc,
      _id: appointment.id,
      createdAt: appointment.createdAt.toISOString(),
      updatedAt: appointment.updatedAt.toISOString(),
    };

    if (appointment.employee && user.id === appointment.employee.id) {
      const income = await incomeCalc(appointment);
      returnObject.income = income;
    }

    return res.status(200).json({
      success: true,
      result: returnObject,
    });
  } catch (err) {
    console.error("getAppointment || error", err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Create new Appointment
// @route   POST /appointment/
// @access  Private
exports.createAppointment = asyncHandler(async (req, res, next) => {
  const TYPE_A_APPOINTMENTS = ["DOG_WALKING", "PET_SITTING", "POTTY_BREAK"];
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
    if (TYPE_A_APPOINTMENTS.includes(type)) {
      handleAppointmentTypeASetup(req, res);
    }
  } catch (error) {
    console.log("createAppointment", error);
  }
});

// @desc    Update Appointment
// @route   PUT /appointment/:id
// @access  Private
exports.updateAppointment = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (req.body.status === "AUTHORIZED_TO_CHARGE") {
      // sendPushNotificationToAdmins(
      //   "Appointment",
      //   "Appointment has been authorized to charge"
      // );
    }

    if (!appointment) {
      return res.status(400).json({
        success: false,
        error: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      result: appointment,
    });
  } catch (error) {
    console.log("updateAppointment", error);

    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Delete Appointment
// @route   DELETE /appointment/:id
// @access  Private
exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Please provide an id",
      });
    }
    const appointment = await appointmentModel
      .findById(id)
      .select("+payment.status");

    if (!appointment) {
      return res.status(400).json({
        success: false,
        error: "Appointment not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      req.user.id !== appointment.client.toString()
    ) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    if (
      !["pending", "voided", "refunded"].includes(appointment.payment.status)
    ) {
      await refundAppointment(appointment._id);
    }

    await appointmentModel.findByIdAndUpdate(id, {
      status: "CANCELLED",
      "payment.status": "voided",
    });

    res.status(200).json({
      success: true,
      message: "Appointment deleted",
    });
  } catch (error) {
    console.log("deleteAppointment", error);

    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Appointment Check-in-out
// @route   PUT /appointment/:id/check-in-out
// @access  Employee or Admin
exports.appointmentCheckInOut = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, point, time } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: "Please provide a status",
      });
    }

    if (!time) {
      return res.status(400).json({
        success: false,
        error: "Please provide a time",
      });
    }

    const appointment = await appointmentModel.findById(id).populate("journal");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found",
      });
    }

    if (status === "check-in") {
      appointment.status = "ONGOING";
      appointment.check_in = {
        properties: { actualTime: new Date(), timeStamp: time },
        point,
      };
      appointment.save();
    }

    if (status === "check-out") {
      appointment.check_out = {
        properties: { actualTime: new Date(), timeStamp: time },
        point,
      };
      appointment.status = "COMPLETED";
      appointment.save();

      if (appointment.type === "MEET_AND_GREET") {
        if (await handleClientActivation(appointment)) {
          return res.status(200).json({
            success: true,
            message: "Appointment completed successfully",
          });
        } else {
          return res.status(500).json({
            success: false,
            error: "Client Activation Failed",
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      result: appointment,
    });
  } catch (error) {
    console.log("checkInOut", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    write Journal
// @route   POST /appointment/journal
// @access  Employee or Admin
exports.writeJournal = asyncHandler(async (req, res, next) => {
  try {
    const { id, journal } = req.body;

    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found",
      });
    }

    if (appointment.employee.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    // console.log("writeJournal | journal:", journal);

    const journalObject = await journalModel.create(journal);

    appointment.journal = journalObject._id;
    appointment.save();

    return res.status(200).json({
      success: true,
      message: "Journal saved",
    });
  } catch (error) {
    console.log("writeJournal", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Get Appointment Journal
// @route   GET /appointment/:id/journal
// @access  Protected
exports.getJournal = asyncHandler(async (req, res, next) => {
  const { user } = req;
  try {
    const { id } = req.params;

    const appointment = await appointmentModel.findById(id);

    // console.log("getJournal | appointment:", appointment);

    if (
      user.role !== "admin" &&
      (user.id !== appointment.employee.toString()) &
        (user.id !== appointment.client.toString())
    ) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const journal = await journalModel.findById(appointment.journal);

    if (!journal) {
      return res.status(404).json({
        success: false,
        error: "Journal not found",
      });
    }

    return res.status(200).json({
      success: true,
      result: journal,
    });
  } catch (error) {
    console.log("getJournal", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Write a Review
// @route   POST /appointment/review
// @access  Protected
exports.writeReview = asyncHandler(async (req, res, next) => {
  try {
    const { id, review } = req.body;

    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found",
      });
    }

    if (
      appointment.employee.toString() !== req.user.id &&
      user.role !== appointment.client.toString()
    ) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const reviewObject = await reviewModel.create({
      ...review,
      appointment: id,
      user: req.user.id,
    });

    appointment.reviews.push(reviewObject._id);

    appointment.save();

    return res.status(200).json({
      success: true,
      result: reviewObject,
    });
  } catch (error) {
    console.log("writeReview", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Submit a Claim
// @route   POST /appointment/claim
// @access  Protected
exports.submitClaim = asyncHandler(async (req, res, next) => {
  try {
    const { id, claim } = req.body;

    const { user } = req;

    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found",
      });
    }

    if (user.id !== appointment.client.toString()) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const claimObject = await claimModel.create({
      ...claim,
      appointment: id,
      user: user.id,
    });

    appointment.claim = claimObject._id;
    appointment.status = "DISPUTED";

    appointment.save();

    // send notification to employee and admin
    // send email to employee and admin

    return res.status(200).json({
      success: true,
      result: claimObject,
    });
  } catch (error) {
    console.log("submitClaim", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Get Appointment Claim
// @route   GET /appointment/:id/claim
// @access  Protected
exports.getClaim = asyncHandler(async (req, res, next) => {
  const { user } = req;
  try {
    const { id } = req.params;

    const claim = await claimModel
      .findById(id)
      .populate("user", USER_PROJECTION_PUBLIC)
      .populate("messages")
      .populate({
        path: "messages",
        populate: {
          path: "user",
          select: USER_PROJECTION_PUBLIC,
        },
      });

    if (!claim) {
      return res.status(404).json({
        success: false,
        error: "Claim not found",
      });
    }

    if (user.id !== claim.user._id.toString() && user.role !== "admin") {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      result: claim,
    });
  } catch (error) {
    console.log("getClaim", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Get claims list
// @route   GET /appointment/claim-list
// @access  Admin Protected
exports.getClaimsList = asyncHandler(async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const cursor = req.query.cursor;
    const status = req.query.status?.split(",") || [];
    const type = req.query.type;

    let claims;

    let filters = {
      $and: [],
    };
    if (status.length) {
      filters["$and"].push({ status: { $in: status } });
    }

    if (filters["$and"].length === 0) {
      delete filters["$and"];
    }

    if (cursor) {
      const decryptedCursorDate = DateTime.fromMillis(parseInt(cursor));
      filters["$and"].push({
        createdAt: {
          $lte: decryptedCursorDate.toJSDate(),
        },
      });
    }
    claims = await claimModel
      .find(filters)
      .populate("user", USER_PROJECTION_PUBLIC)
      .sort({ "time.start": +1 })
      .limit(limit + 1);

    // console.log("claims", claims);

    if (!claims) {
      return res.status(404).json({
        success: false,
        error: "No claims found",
      });
    }
    const claimsCount = await claimModel.countDocuments();

    const hasMore = claims.length === limit + 1;
    let nextCursor = null;

    // assign cursor to next set's first element
    if (hasMore) {
      const nextCursorRecord = claims[limit];
      nextCursor = nextCursorRecord.createdAt.getTime();
      claims.pop();
    }

    let count = claims.length;

    return res.status(200).json({
      success: true,
      totalCount: claimsCount,
      count,
      hasMore,
      nextCursor,
      result: claims,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    Send claim message
// @route   POST /appointment/claim/:id/message
// @access  Protected
exports.sendClaimMessage = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const { user } = req;

    const claim = await claimModel.findById(id);

    console.log("message", message);

    if (!claim) {
      return res.status(404).json({
        success: false,
        error: "Claim not found",
      });
    }

    if (user.id !== claim.user._id.toString() && user.role !== "admin") {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const messageObject = await messageModel.create({
      message,
      user: user.id,
    });

    claim.messages.push(messageObject._id);

    if (claim.status === "pending") {
      claim.status = "inprogress";
    }

    claim.save();

    return res.status(200).json({
      success: true,
      result: messageObject,
    });
  } catch (error) {
    console.log("sendClaimMessage", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    update claim status
// @route   PUT /appointment/claim/:id/
// @access  Admin Protected
exports.submitClaimDecision = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, decision } = req.body;

    const claim = await claimModel.findById(id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        error: "Claim not found",
      });
    }

    if (!["pending", "inprogress"].includes(claim.status)) {
      return res.status(400).json({
        success: false,
        error: "Claim is already decided",
      });
    }

    claim.status = status;
    claim.decision = decision;

    claim.save();

    if (status === "approved") {
      await refundAppointment(claim.appointment.toString(), true);
    }

    return res.status(200).json({
      success: true,
      message: "Claim decision submitted",
    });
  } catch (error) {
    console.log("submitClaimDecision", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
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
      .populate("employee", "name email pictures")
      .populate("appointment_id")
      .populate({
        path: "appointment_id",
        populate: {
          path: "pets",
          model: "Pet",
          select: PET_CARD_PROJECTION,
        },
      })
      .populate({
        path: "appointment_id",
        populate: {
          path: "location",
          model: "Location",
          select: LOCATION_CARD_PROJECTION,
        },
      });

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

// @desc    Assign an employee to an appointment
// @route   PUT /appointment/assign-employee
// @access  Private
exports.assignEmployee = asyncHandler(async (req, res, next) => {
  try {
    console.log("assignEmployee | req.body:", req.body);
    const { appointmentId, employeeId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found",
      });
    }

    const employee = await userModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    appointment.employee = employeeId;
    appointment.status = "EMPLOYEE_REQUESTED";

    await appointment.save();

    res.status(200).json({
      success: true,
      result: appointment,
    });
  } catch (error) {
    console.log("assignEmployee", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Appointment Request Response
// @route   PUT /appointment/response
// @access  employee
exports.responseAppointmentRequest = asyncHandler(async (req, res, next) => {
  const { appointmentId, status: responseType } = req.body;
  console.log("responseAppointmentRequest | req.body:", req.body);
  try {
    const appointment = await appointmentModel
      .findById(appointmentId)
      .populate("employee", "name email");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found",
      });
    }

    if (appointment.employee._id.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    // get admins push token
    const admins = await userModel.find({ role: "admin" });
    const notificationTokens = await admins.map((admin) => admin.push_token);

    // accept appointment
    if (responseType === "accepted") {
      appointment.status = "ASSIGNED";
      await appointment.save();

      await createPaymentIntent(req, res, appointment);

      await sendPushNotification(
        notificationTokens,
        "Appointment Employee Response",
        `${appointment.employee.name} accepted assigned appointment request.`
      );
    }

    // reject appointment
    if (responseType === "rejected") {
      if (appointment.type === "MEET_AND_GREET") {
        const meetAndGreet = await MeetAndGreet.findOne({
          appointment_id: appointment,
        });

        if (meetAndGreet) {
          meetAndGreet.status = "CONTACTED";
          meetAndGreet.appointment_id = null;
          await meetAndGreet.save();

          await appointment.remove();

          await sendPushNotification(
            notificationTokens,
            "Appointment Employee Response",
            `${appointment.employee.name} didn't accepted the assigned meet and greet request.`
          );

          return res.status(200).json({
            success: true,
            message: "Appointment cancelled",
          });
        }
      }
      appointment.employee = null;
      // email to admin
      await appointment.save();

      await sendPushNotification(
        notificationTokens,
        "Appointment Employee Response",
        `${appointment.employee.name} didn't accepted the assigned appointment request.`
      );

      res.status(200).json({
        success: true,
        result: appointment,
      });
    }
  } catch (error) {
    console.log("responseAppointmentRequest", error);
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
      appointment_id: null,
    });

    // console.log("meet_and_greet", profile);
    profile.meet_and_greet = meet_and_greet._id;
    await profile.save();

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

    let startTime = new Date(time);

    const appointment = await appointmentModel.create({
      client: clientProfile.user,
      employee: employeeProfile.user,
      type: "MEET_AND_GREET",
      location: clientProfile.locations[0]._id,
      pets: clientProfile.pets,
      time: {
        start: startTime,
        // add 30 minutes to start time
        end: new Date(startTime.getTime() + 30 * 60000),
      },
      notes,
      status: "EMPLOYEE_REQUESTED",
      payment: {
        amount: {
          total: 0,
          tip: 0,
        },
      },
    });

    // console.log("handleMeetAndGreetSetup | appointment:", appointment);

    meetAndGreetObj.appointment_id = appointment._id;
    meetAndGreetObj.status = "EMPLOYEE_REQUESTED";

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
const handleAppointmentTypeASetup = asyncHandler(async (req, res) => {
  try {
    // return console.log("handleAppointmentTypeASetup | req.body:", req.body);
    const { type, location, pets, time, amount } = req.body;
    const client = req.user;
    const petsList = pets.map((pet) => pet._id);
    const paymentAmount = calculateAppointmentBaseFee(
      type,
      pets.length,
      time.duration
    );
    const appointment = await appointmentModel.create({
      client,
      type,
      location,
      pets: petsList,
      time,
      payment: {
        amount: {
          total: +(paymentAmount + amount.tip).toFixed(2),
          tip: amount.tip,
        },
      },
      status: "READY_TO_PAY",
    });

    return res.status(200).json({
      success: true,
      message: "Dog walking appointment setup successfully",
      result: appointment,
    });
  } catch (error) {
    console.log("handleAppointmentTypeASetup | error", error);
    return res.status(400).json({
      success: false,
      error: "Internal server error. Please contact support",
    });
  }
});

// handle client activation after meet and greet
const handleClientActivation = async (appointment) => {
  try {
    const meetAndGreet = await MeetAndGreet.findOne({
      appointment_id: appointment._id,
    });
    const clientProfile = await Profile.findOne({ user: appointment.client });

    clientProfile.activated = true;
    await clientProfile.save();

    meetAndGreet.status = "COMPLETED";
    await meetAndGreet.save();

    return true;
  } catch (error) {
    console.log("handleClientActivation | error", error);
  }
};
