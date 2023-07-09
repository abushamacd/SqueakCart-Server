const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
        color: {
          type: Schema.Types.ObjectId,
          ref: "Color",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    cartTotal: {
      type: Number,
    },
    orderby: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Cart = model("Cart", cartSchema);

module.exports = Cart;
