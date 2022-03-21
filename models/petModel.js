const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    general_info: {
      name: { type: String, required: true },
      species: { type: String, required: true },
      breed: {
        type: String,
        required: true,
      },
      weight: { type: Number, required: true },
      color: { type: String, required: true },
      sprayed_neutered: { type: Boolean, required: true },
      dob: { type: Date, required: true },
      adoption_date: { type: Date, required: true },
      special_notes: { type: String, required: true },
      photos: [{ type: String }],
    },
    characteristics: {
      good_with_people: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0,
        required: true,
      },
      good_with_kids: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0,
        required: true,
      },
      good_with_dogs: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0,
        required: true,
      },
      good_with_cats: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0,
        required: true,
      },
      good_with_other_pets: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0,
        required: true,
      },
      notes: {
        type: String,
        default: "",
      },
    },
    location_rules: {
      allowed_to_go_out: { type: Boolean },
      allowed_on_furniture: { type: Boolean },
      sleep_location: { type: String },
    },
    training: {
      commands: [{ type: String }],
      house_trained: { type: Boolean },
      notes: { type: String },
    },
    emergency_veterinarian: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      insured: { type: Boolean, required: true },
      veterinarian: { type: String, required: true },
      veterinarian_phone: { type: String, required: true },
      veterinarian_address: { type: String, required: true },
      insurance_provider: { type: String, required: true },
      insurance_number: { type: String, required: true },
    },
    vaccinations: [
      {
        vaccine_type: { type: String },
        date: { type: Date },
        expiration_date: { type: Date },
      },
    ],
    medical: {
      allergies: { type: String },
      medications: { type: String },
      notes: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
