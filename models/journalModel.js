const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const journalSchema = Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    photos: [String],

    activities: {
      poop: {
        type: Number,
        default: 0,
      },
      pee: {
        type: Number,
        default: 0,
      },
      food: {
        type: Boolean,
        default: false,
      },
      water: {
        type: Boolean,
        default: false,
      },
      medicine: {
        type: Boolean,
        default: false,
      },
      chews: {
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
