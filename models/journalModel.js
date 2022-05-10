const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const journalSchema = Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    photos: [String],

    activities: {
      POOP: {
        type: Number,
        default: 0,
      },
      PEE: {
        type: Number,
        default: 0,
      },
      FOOD: {
        type: Boolean,
        default: false,
      },
      WATER: {
        type: Boolean,
        default: false,
      },
      MEDICINE: {
        type: Boolean,
        default: false,
      },
      CHEWS: {
        type: Boolean,
        default: false,
      },
      TREAT: {
        type: Boolean,
        default: false,
      },
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
