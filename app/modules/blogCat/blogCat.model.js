const { Schema, model } = require("mongoose");

const blogCatSchema = new Schema(
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

const BlogCat = model("BlogCat", blogCatSchema);

module.exports = BlogCat;
