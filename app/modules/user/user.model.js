const { Schema, model } = require("mongoose");
const { role } = require("./user.constant");
const bcrypt = require("bcrypt");
const config = require("../../../src/config");

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: role,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Existency Check
userSchema.statics.isExist = async function (email) {
  return await User.findOne(
    { email },
    { email: 1, password: 1, role: 1, id: 1, _id: 1 }
  );
};

// Password Match
userSchema.statics.isPasswordMatched = async function (
  givenPassword,
  savedPassword
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// Password Encrypt
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_solt_round)
  );
  next();
});

const User = model("User", userSchema);

module.exports = User;
