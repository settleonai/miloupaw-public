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
    },

    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],

    service_items: [{ type: String, default: [] }],

    check_in: {
      properties: { timeStamp: { type: Date }, actualTime: { type: Date } },
      point: {
        type: {
          type: String,
          default: "Point",
        },
        coordinates: {
          type: [Number],
        },
      },
    },
    check_out: {
      properties: { timeStamp: { type: Date }, actualTime: { type: Date } },
      point: {
        type: {
          type: String,
          default: "Point",
        },
        coordinates: {
          type: [Number],
        },
      },
    },
    location_snapshot: [
      {
        properties: {
          timeStamp: Date,
        },
        point: {
          type: {
            type: String,
            default: "Point",
          },
          coordinates: {
            type: [Number],
          },
        },
      },
    ],

    payment: {
      amount: {
        total: { type: Number, default: 0 },
        total_no_tip: { type: Number, default: 0 },
        tip: { type: Number, default: 0 },
        employee_share: { type: Number, default: 0, select: false },
        app_fee: { type: Number, default: 0, select: false },
        company_commission: { type: Number, default: 0, select: false },
      },
      discount: {
        amount: { type: Number, default: 0 },
        coupon: { type: Schema.Types.ObjectId, ref: "Coupon", select: false },
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
      intents: [
        {
          id: { type: String },
          status: { type: String },
          amount: { type: Number },
          select: false,
        },
      ],
      off_session_tips: [
        {
          id: { type: String },
          status: { type: String },
          amount: { type: Number },
          select: false,
        },
      ],
      charge: {
        id: { type: String },
        created: { type: Date },
        select: false,
      },
      transfer: {
        id: { type: String },
        amount: { type: Number },
        balance_transaction: {
          type: String,
        },
        created: { type: Date },
        currency: {
          type: String,
          enum: currenciesList,
          required: true,
          default: "USD",
        },
        description: { type: String },
        destination: { type: String },
        destination_payment: { type: String },
        select: false,
      },
      reversal: {
        id: { type: String },
        amount: { type: Number },
        created: { type: Date },
        currency: {
          type: String,
          enum: currenciesList,
          required: true,
          default: "USD",
        },
        transfer: { type: String },
        select: false,
      },
      payout: {
        id: { type: String },
        amount: { type: Number },
        balance_transaction: {
          type: String,
        },
        arrival_date: { type: Date },
        created: { type: Date },
        currency: {
          type: String,
          enum: currenciesList,
          required: true,
          default: "USD",
        },
        description: { type: String },
        destination: { type: String },
        select: false,
      },
      refunds: [
        {
          id: { type: String },
          amount: { type: Number },
          created: { type: Date },
          currency: {
            type: String,
            enum: currenciesList,
            required: true,
            default: "USD",
          },
          intent: { type: String },
          reason: { type: String },
          receipt_number: { type: String },
          status: { type: String },
          destination: { type: String },
          transfer_reversal: { type: String },
          select: false,
        },
      ],

      receipts_url: [{ type: String, default: "" }],
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

    journal: {
      type: Schema.Types.ObjectId,
      ref: "Journal",
    },

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
