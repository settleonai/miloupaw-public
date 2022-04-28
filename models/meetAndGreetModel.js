const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { MEET_AND_GREET_STATUS } = require("../server/utils/types");

const meetAndGreetSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "User", required: true },
    employee: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      default: "REQUESTED",
      enum: MEET_AND_GREET_STATUS,
    },
    appointment_id: { type: Schema.Types.ObjectId, ref: "Appointment" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MeetAndGreet", meetAndGreetSchema);
