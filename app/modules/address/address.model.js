const { Schema, model } = require("mongoose");
const { status } = require("./address.constant");

const addressSchema = new Schema(
  {
    addressline1: {
      type: String,
      required: true,
    },
    addressline2: {
      type: String,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    userId: {
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

const Address = model("Address", addressSchema);

module.exports = Address;
