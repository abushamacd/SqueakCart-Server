const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Brand = model("Brand", brandSchema);

module.exports = Brand;
