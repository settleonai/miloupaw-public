const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    meet_and_greets: [
      {
        type: Schema.Types.ObjectId,
        ref: "MeetAndGreet",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminProfile", adminProfileSchema);
