const { Schema, model } = require("mongoose");
const { status } = require("./product.constant");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProCat",
        required: true,
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    color: [
      {
        type: Schema.Types.ObjectId,
        ref: "Color",
        required: true,
      },
    ],
    tag: {
      type: Array,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      min: [0, "View can't be less than 0"],
    },
    status: {
      type: String,
      enum: {
        values: status,
        message: "Status can't be {VALUE}. Either available or unavailable",
      },
      default: "available",
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalrating: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  if (this.view == null) {
    this.view = 0;
  }
  next();
});

productSchema.pre("save", function (next) {
  if (this.quantity == 0) {
    this.status = "unavailable";
  }
  next();
});

const Product = model("Product", productSchema);

module.exports = Product;
