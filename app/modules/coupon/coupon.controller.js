const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createCouponService,
  getCouponsService,
  getCouponService,
  updateCouponService,
  deleteCouponService,
} = require("./coupon.services");
const { pick } = require("../../../src/utilities/pick");
const { couponFilterableFields } = require("./coupon.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createCoupon = tryCatch(async (req, res) => {
  const result = await createCouponService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon created successfully",
    data: result,
  });
});

exports.getCoupons = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, couponFilterableFields);
  const result = await getCouponsService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupons retrived successfully",
    data: result,
  });
});

exports.getCoupon = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getCouponService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon retrived successfully",
    data: result,
  });
});

exports.updateCoupon = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await updateCouponService(id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon update successfully",
    data: result,
  });
});

exports.deleteCoupon = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteCouponService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon delete successfully",
    data: result,
  });
});
