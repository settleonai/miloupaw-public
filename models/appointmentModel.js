const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const {
  SERVICE_PAYMENT_TYPES,
  SERVICE_TYPES,
  SERVICE_STATUS,
} = require("../server/utils/types");
// const { currenciesList } = require("../utils/currencies");

const appointmentSchema = Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    client: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: SERVICE_TYPES,
      required: true,
    },
    coordinates: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
      },
      coordinates: {
        type: [Number],
      },
      required: false,
    },
    address: {
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      state: { type: String },
      postal_code: { type: String },
      country: { type: String },
      formatted_address: { type: String },
    },
    location_timelaps: [
      {
        longitude: { type: Number },
        latitude: { type: Number },
        select: false,
      },
    ],

    payment: {
      amount: { type: Number, required: true },
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
        client_secret: { type: String },
        status: { type: String },
        on_behalf_of: { type: String },
        url: { type: String },
        amount: { type: Number },
        currency: {
          type: String,
          enum: currenciesList,
          required: true,
          default: "USD",
        },
        transfer_group: { type: String },
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
          default: "usd",
        },
        destination: { type: String },
      },
      receipt_url: { type: String, default: "" },
    },
    time: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    notes: { type: String, default: "" },
    status: {
      type: String,
      default: "requested",
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
