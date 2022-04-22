const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClaimSchema = new Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "inprogress", "approved", "denied"],
    },
    note: { type: String, default: "" },
    photos: [{ type: String, default: "" }],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    decision: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", ClaimSchema);
