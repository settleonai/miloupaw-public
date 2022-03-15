const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
    },
    picture: {
      type: String,
    },
    role: {
      type: String,
      enum: ["client", "employee", "admin", "organization"],
      default: "client",
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
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
