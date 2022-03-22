const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/fnel/image/upload/v1634880347/avatar/default-avatar.jpg",
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    phone_number: { type: String },
    phone_verified: { type: Boolean, default: false },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female", "other", "prefernot"],
    },
    birth_date: { type: Date },
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
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
    verification: {
      status: { type: String, enum: ["applied", "approved", "rejected"] },
      ref: { type: String },
    },
    bio: { type: String, default: "" },
    business_info: {
      activated: { type: Boolean, default: false },
      customer_id: { type: String },
      type: { type: String },
    },
    meet_and_greet: {
      activated: { type: Boolean, default: false },
      employee_id: { type: String },
      type: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
