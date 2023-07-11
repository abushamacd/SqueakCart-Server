const express = require("express");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const {
  createCart,
  getCart,
  clearCart,
  removeFromCart,
} = require("./cart.controller");
const { createCartZod, removeFromCartZod } = require("./cart.validation");
const { reqValidate } = require("../../../src/middleware/reqValidate");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create cart
   * @apiPermission all
   **/
  .post(
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    reqValidate(createCartZod),
    createCart
  )
  /**
   * @api {get} /
   * @apiDescription get user's cart
   * @apiPermission all
   **/
  .get(auth(USER_ROLE.ADMIN, USER_ROLE.USER), getCart)
  /**
   * @api {delete} /
   * @apiDescription clear user's cart
   * @apiPermission all
   **/
  .delete(auth(USER_ROLE.ADMIN, USER_ROLE.USER), clearCart);

router
  .route("/:id")
  /**
   * @api {post} /
   * @apiDescription create cart
   * @apiPermission all
   **/
  .patch(
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    reqValidate(removeFromCartZod),
    removeFromCart
  );

module.exports = router;
