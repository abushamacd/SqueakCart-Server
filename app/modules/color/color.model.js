const { Schema, model } = require("mongoose");

const colorSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Color = model("Color", colorSchema);

module.exports = Color;
