const { Schema, model } = require("mongoose");

const couponSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    date: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Coupon = model("Coupon", couponSchema);

module.exports = Coupon;
