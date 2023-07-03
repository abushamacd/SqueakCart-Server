const { Schema, model } = require("mongoose");

const proCatSchema = new Schema(
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

const ProCat = model("ProCat", proCatSchema);

module.exports = ProCat;
