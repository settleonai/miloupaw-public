const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    avatar: { type: String },

    newMessagePopup: { type: Boolean, default: true },
    unreadMessage: { type: Boolean, default: false },
    unreadNotification: { type: Boolean, default: false },

    role: {
      type: String,
      default: "client",
      enum: ["client", "employee", "admin", "organizer"],
    },

    referee: {
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
    accessToken: { type: String, required: true },
    expiresIn: { type: Date },
    issuedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
