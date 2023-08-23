const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createPaymentIntentService,
  createOrderService,
  getUserOrdersService,
} = require("./order.services");
const { pick } = require("../../../src/utilities/pick");
const { orderFilterableFields } = require("./order.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createPaymentIntent = tryCatch(async (req, res) => {
  const result = await createPaymentIntentService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create intent successfully",
    data: result,
  });
});

exports.createOrder = tryCatch(async (req, res) => {
  const { _id } = req.user;
  const { data } = req.body;
  const result = await createOrderService(_id, data);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Place Order successfully",
    data: result,
  });
});

exports.getUserOrders = tryCatch(async (req, res) => {
  const { _id } = req.user;
  const result = await getUserOrdersService(_id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrive successfully",
    data: result,
  });
});
