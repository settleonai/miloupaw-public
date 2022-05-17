const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      select: false,
    },
    pictures: String,

    role: {
      type: String,
      enum: ["client", "employee", "admin", "organization"],
      default: "client",
    },
    googleId: {
      type: String,
    },
    email_verified: {
      type: Boolean,
    },
    appleId: {
      type: String,
    },
    push_token: String,

    access_token: {
      type: String,
    },
    token_exp: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
