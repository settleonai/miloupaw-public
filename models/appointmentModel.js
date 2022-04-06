const mongoose = require("mongoose");
const { currenciesList } = require("../server/utils/currencies");
const Schema = mongoose.Schema;

const {
  SERVICE_PAYMENT_TYPES,
  SERVICE_TYPES,
  SERVICE_STATUS,
} = require("../server/utils/types");
// const { currenciesList } = require("../utils/currencies");

const appointmentSchema = Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: "User", required: false },
    client: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: SERVICE_TYPES,
      required: true,
    },

    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    location_snapshot: [
      {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ["Point"], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
        },
        time: {
          type: Date,
        },
      },
    ],
    payment: {
      amount: {
        total: { type: Number, default: 0 },
        tip: { type: Number, default: 0 },
      },
      currency: {
        type: String,
        enum: currenciesList,
        required: true,
        default: "USD",
      },
      status: {
        type: String,
        enum: SERVICE_PAYMENT_TYPES,
        default: "pending",
        select: false,
      },
      intent: {
        id: { type: String },

        status: { type: String },

        amount: { type: Number },

        select: false,
      },
      charge: {
        id: { type: String },
        created: { type: Date },
        select: false,
      },
      transfer: {
        id: { type: String },
        created: { type: Date },
        select: false,
        balance_transaction: {
          type: String,
        },
        amount: { type: Number },
        currency: {
          type: String,
          enum: currenciesList,
          required: true,
          default: "USD",
        },
        destination: { type: String },
      },
      receipt_url: { type: String, default: "" },
    },
    time: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
      duration: { type: Number, required: true, default: 30 },
    },
    notes: { type: String, default: "" },
    status: {
      type: String,
      default: "REQUESTED",
      enum: SERVICE_STATUS,
    },

    completed_by: { type: Schema.Types.ObjectId, ref: "User" },
    completion_date: { type: Date },

    claim: {
      type: Schema.Types.ObjectId,
      ref: "Claim",
      default: null,
    },

    is_private: { type: Boolean, default: false },

    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    open_reviews: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
