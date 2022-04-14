const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    coupon_code: {
      type: String,
      required: true,
      unique: true,
    },
    coupon_type: {
      type: String,
      required: true,
    },
    coupon_reusable: {
      type: Boolean,
      required: true,
    },
    coupon_reusable_count: {
      type: Number,
    },
    coupon_value: {
      type: Number,
      required: true,
    },
    coupon_expiry_date: {
      type: Date,
      required: true,
    },
    coupon_status: {
      type: String,
      required: true,
    },
    coupon_usages: [
      {
        usedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        usedOn: {
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

module.exports = mongoose.model("Coupon", couponSchema);
