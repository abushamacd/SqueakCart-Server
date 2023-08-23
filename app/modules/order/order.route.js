const express = require("express");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const {
  createPaymentIntent,
  createOrder,
  getUserOrders,
  getOrders,
  updateOrder,
  deleteOrder,
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
  )
  /**
   * @api {post} /
   * @apiDescription create order
   * @apiPermission all
   **/
  .get(auth(USER_ROLE.ADMIN, USER_ROLE.USER), getOrders);

router
  .route("/user")
  /**
   * @api {get} /
   * @apiDescription create order
   * @apiPermission all
   **/
  .get(auth(USER_ROLE.ADMIN, USER_ROLE.USER), getUserOrders);

router
  .route("/:id")
  /**
   * @api {patch} /
   * @apiDescription update a single order
   * @apiPermission all
   **/
  .patch(auth(USER_ROLE.ADMIN), updateOrder)
  /**
   * @api {delete} /
   * @apiDescription delete a single order
   * @apiPermission all
   **/
  .delete(auth(USER_ROLE.ADMIN), deleteOrder);

module.exports = router;
