const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    products: [
      {
        productId: {
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
        // color: {
        //   type: String,
        //   required: true,
        // },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    cartTotal: {
      type: Number,
    },
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
