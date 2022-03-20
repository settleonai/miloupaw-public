const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    address: {
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      state: { type: String },
      postal_code: { type: String },
      country: { type: String },
      formatted_address: { type: String },
    },
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
    uses_keys: { type: Boolean, default: false },
    alarm_system: { type: Boolean, default: false },
    alarm_code: { type: String, default: "" },
    access_parking_notes: { type: String, default: "" },
    photos: [{ type: String }],
    special_notes: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Home", locationSchema);
