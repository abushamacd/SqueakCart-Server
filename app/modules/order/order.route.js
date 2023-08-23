const express = require("express");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const {
  createPaymentIntent,
  createOrder,
  getUserOrders,
} = require("./order.controller");
const { createOrderZod } = require("./order.validation");
const { reqValidate } = require("../../../src/middleware/reqValidate");

const router = express.Router();

router
  .route("/createIntent")
  /**
   * @api {post} /
   * @apiDescription create order
   * @apiPermission all
   **/
  .post(
    // auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    // reqValidate(createOrderZod),
    createPaymentIntent
  );

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create order
   * @apiPermission all
   **/
  .post(
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    // reqValidate(createOrderZod),
    createOrder
  );

router
  .route("/user")
  /**
   * @api {get} /
   * @apiDescription create order
   * @apiPermission all
   **/
  .get(auth(USER_ROLE.ADMIN, USER_ROLE.USER), getUserOrders);

module.exports = router;
