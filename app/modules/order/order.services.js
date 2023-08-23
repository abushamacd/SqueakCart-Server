const { default: mongoose, Error } = require("mongoose");
const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const Product = require("../product/product.model");
const User = require("../user/user.model");
const { orderSearchableFields, orderPopulate } = require("./order.constant");
const Order = require("./order.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntentService = async ({ total }) => {
  const price = parseFloat(total);
  const amount = price * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  if (!paymentIntent) {
    throw new Error("Create intent failed");
  }
  const result = { clientSecret: paymentIntent.client_secret };
  return result;
};

exports.createOrderService = async (userId, payload) => {
  payload.orderBy = userId;
  const result = await Order.create(payload);
  if (!result) {
    throw new Error("Order place failed");
  }
  return result;
};

exports.getUserOrdersService = async (userId) => {
  const result = await Order.find({ orderBy: userId }).populate(orderPopulate);
  if (!result) {
    throw new Error("Order place failed");
  }
  return result;
};
