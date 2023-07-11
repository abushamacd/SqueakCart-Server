const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createCartService,
  getCartsService,
  getCartService,
  updateCartService,
  deleteCartService,
  clearCartService,
  removeFromCartService,
  handleQuantityService,
} = require("./cart.services");
const { pick } = require("../../../src/utilities/pick");
const { cartFilterableFields } = require("./cart.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createCart = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const result = await createCartService(_id, req.body);
  // const result = null;
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart created successfully",
    data: result,
  });
});

exports.getCart = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const result = await getCartService(_id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart retrived successfully",
    data: result,
  });
});

exports.clearCart = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const result = await clearCartService(_id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Clear cart successfully",
    data: result,
  });
});

exports.removeFromCart = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const { id } = req?.params;
  const { color } = req?.body;
  const result = await removeFromCartService(_id, id, color);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Remove this varient successfully",
    data: result,
  });
});

exports.handleQuantity = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const { id } = req?.params;
  const result = await handleQuantityService(_id, id, req?.body);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Remove this varient successfully",
    data: result,
  });
});
