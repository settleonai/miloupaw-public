const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/fnel/image/upload/v1634880347/avatar/default-avatar.jpg",
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    phone_verified: { type: Boolean, default: false },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female", "other", "prefer_not"],
    },
    birth_date: { type: Date },
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

    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    stripe_id: { type: String, select: false },
    interviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    interview_dateTime: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusinessProfile", businessProfileSchema);
