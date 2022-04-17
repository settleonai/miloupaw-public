const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    photos: [
      {
        type: String,
      },
    ],

    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
