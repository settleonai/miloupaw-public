const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["percentage", "fixed"],
    },
    reusable: {
      type: Boolean,
      required: true,
    },
    reusable_count: {
      type: Number,
    },
    value: {
      type: Number,
      required: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    records: [
      {
        used_by: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        used_on: {
          type: Schema.Types.ObjectId,
          ref: "Appointment",
        },
        used_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const updatedCouponSchema = new Schema();
updatedCouponSchema.add(couponSchema).add({
  repeatable_user: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Coupon", couponSchema);
