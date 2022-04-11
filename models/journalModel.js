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

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
