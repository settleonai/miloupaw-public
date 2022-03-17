const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    phone_number: { type: String },
    phone_verified: { type: Boolean, default: false },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female", "other", "prefernot"],
    },
    birth_date: { type: Date },
    homes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Home",
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
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    verification: {
      status: { type: String, enum: ["applied", "approved", "rejected"] },
      ref: { type: String },
    },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
