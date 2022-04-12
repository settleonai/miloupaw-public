const mongoose = require("mongoose");
const { currenciesList } = require("../server/utils/currencies");
const Schema = mongoose.Schema;

const { TimeZones } = require("../server/constants/timeZones");
const weekdayAvailabilitySchema = new Schema({
  available: { type: Boolean, default: true },
  time: {
    start: { type: String, default: "08:00" },
    end: { type: String, default: "17:00" },
  },
});
const businessProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    phone_verified: { type: Boolean, default: false },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female", "other", "prefer_not"],
    },
    date_of_birth: { type: Date },
    coordinates: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        // required: true,
      },
      coordinates: {
        type: [Number],
        // required: true,
      },
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
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    bio: { type: String, default: "" },
    good_with_dogs: {
      type: Number,
      enum: [0, 1, 2, 3, 4],
    },
    good_with_cats: {
      type: Number,
      enum: [0, 1, 2, 3, 4],
    },
    good_with_other_pets: {
      type: Number,
      enum: [0, 1, 2, 3, 4],
    },
    notes: {
      type: String,
      default: "",
    },
    commute_method: {
      type: String,
      enum: ["walking", "bicycling", "driving", "transit", "other"],
    },
    maximum_commute_distance: {
      type: Number,
      default: 0,
    },
    driving_license: {
      type: String,
    },

    authorized_to_work_in_us: {
      type: Boolean,
      default: false,
    },
    years_of_experience: { type: Number, default: 0 },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },

    work: {
      timezone: {
        type: String,
        default: "America/Los_Angeles",
        enum: TimeZones,
      },

      availabilities: {
        sunday: weekdayAvailabilitySchema,
        monday: weekdayAvailabilitySchema,
        tuesday: weekdayAvailabilitySchema,
        wednesday: weekdayAvailabilitySchema,
        thursday: weekdayAvailabilitySchema,
        friday: weekdayAvailabilitySchema,
        saturday: weekdayAvailabilitySchema,
      },
      time_offs: [{ type: Schema.Types.ObjectId, ref: "TimeOff" }],

      notes: { type: String, default: "" },
    },

    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    stripe: {
      id: { type: String },
      business_type: { type: String },
      created: { type: Date },
      charges_enabled: { type: Boolean, default: false },
      capabilities: {
        transfers: { type: String },
        card_payments: { type: String },
      },
      currency: {
        type: String,
        enum: currenciesList,
        required: true,
        default: "USD",
      },
    },
    interviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    interview_dateTime: { type: Date },
    partner_class: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
      default: "A",
      select: false,
    },
  },
  { timestamps: true }
);

businessProfileSchema.index({ first_name: "text", last_name: "text" });

module.exports = mongoose.model("BusinessProfile", businessProfileSchema);
