const { Schema, model } = require("mongoose");
const { orderStatus } = require("./order.constant");

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: {
          type: Schema.Types.ObjectId,
          ref: "Color",
        },
      },
    ],
    paymentMethod: {
      type: String,
      default: "Cash",
      enum: ["Cash", "Card"],
    },
    paymentStatus: {
      type: String,
      default: "Due",
      enum: ["Paid", "Due"],
    },
    total: {
      type: Number || Null,
    },
    tnxId: {
      default: null,
      type: String || null,
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: orderStatus,
    },
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
