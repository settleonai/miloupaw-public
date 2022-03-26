const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetAndGreetSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "User", required: true },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      default: "requested",
      enum: ["requested", "contacted", "assigned", "accepted", "rejected"],
    },
    appointment_id: { type: Schema.Types.ObjectId, ref: "Appointment" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MeetAndGreet", meetAndGreetSchema);
