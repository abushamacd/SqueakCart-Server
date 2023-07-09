const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createCartService,
  getCartsService,
  getCartService,
  updateCartService,
  deleteCartService,
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

exports.getCarts = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, cartFilterableFields);
  const result = await getCartsService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Carts retrived successfully",
    data: result,
  });
});

exports.getCart = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getCartService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart retrived successfully",
    data: result,
  });
});

exports.updateCart = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await updateCartService(id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart update successfully",
    data: result,
  });
});

exports.deleteCart = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteCartService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart delete successfully",
    data: result,
  });
});
