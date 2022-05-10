const mongoose = require("mongoose");
const { Schema } = mongoose;

const errorSchema = new Schema(
  {
    error: {
      type: Object,
      required: true,
    },
    error_info: {
      type: Object,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Error", errorSchema);
