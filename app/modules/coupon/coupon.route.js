const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const { createCouponZod, updateCouponZod } = require("./coupon.validation");
const {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("./coupon.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create contact
   * @apiPermission all
   **/
  .post(reqValidate(createCouponZod), createCoupon)
  /**
   * @api {get} /
   * @apiDescription ger all contacts
   * @apiPermission all
   **/
  // .get(auth(USER_ROLE.ADMIN), createCoupon);
  .get(getCoupons);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get a single contact
   * @apiPermission all
   **/
  .get(getCoupon)
  /**
   * @api {patch} /
   * @apiDescription update a single contact
   * @apiPermission all
   **/
  .patch(reqValidate(updateCouponZod), updateCoupon)
  /**
   * @api {delete} /
   * @apiDescription delete a single contact
   * @apiPermission all
   **/
  .delete(deleteCoupon);

module.exports = router;
