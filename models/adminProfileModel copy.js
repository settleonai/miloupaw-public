const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeOffSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approved_by: { type: Schema.Types.ObjectId, ref: "User" },
    approved_date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimeOff", timeOffSchema);
