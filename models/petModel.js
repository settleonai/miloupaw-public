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
        required: true,
      },
      color: { type: String, required: true },
      weight: { type: Number, required: true },
      birthday: { type: Date, required: true },
      adoption_date: { type: Date, required: true },
      notes: { type: String, required: true },
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
      name: { type: String },
      phone: { type: String },
      insured: { type: Boolean },
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
      sprayed_neutered: { type: Boolean },
      allergies: { type: String },
      medications: { type: String },
      notes: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
