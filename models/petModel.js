const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccineSchema = new Schema({
  name: { type: String },
  date: { type: Date },
  exp: { type: Date },
});

const petSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    general_info: {
      name: { type: String, required: true },
      species: { type: String, required: true },
      breed: {
        type: String,
      },
      color: { type: String, required: true },
      weight: { type: Number, required: true },
      birthday: { type: Date, required: true },
      adoption_date: { type: Date, required: true },
      adopted_from: { type: String },
      notes: { type: String },
      photos: [{ type: String }],
    },
    characteristics: {
      good_with_people: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
      },
      good_with_kids: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
      },
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
    },
    location_rules: {
      allowed_locations: { type: String },
      allowed_on_furniture: { type: Boolean, default: false },
      loose_in_house: { type: Boolean, default: true },
      sleep_location: { type: String },
    },
    training: {
      commands: [{ type: String }],
      house_trained: { type: String },
      food_per_day: { type: Number },
      food_type: { type: String },
      food_brand: { type: String },
      notes: { type: String },
    },
    emergency_veterinarian: {
      name: { type: String },
      phone: { type: String },
      insured: { type: String },
      veterinarian: { type: String },
      veterinarian_phone: { type: String },
      veterinarian_address: { type: String },
      veterinarian_coordinates: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ["Point"], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
        },
      },
      insurance_provider: { type: String },
      insurance_number: { type: String },
    },
    vaccinations: [vaccineSchema],
    medical: {
      sprayed_neutered: { type: String },
      allergies: [{ type: String }],
      medications: [{ type: String }],
      notes: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
