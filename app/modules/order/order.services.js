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
    throw new Error("Orders retrive failed");
  }
  return result;
};

exports.getOrdersService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: contactSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // filtering on field
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }

  // sorting
  let sortConditions = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  // output
  const result = await Order.find(whereConditions)
    .populate(orderPopulate)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new Error("Orders retrive failed");
  }

  const total = await Order.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.updateOrderService = async (id, payload) => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

exports.deleteOrderService = async (id) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};
