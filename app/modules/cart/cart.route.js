const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const { createCartZod, updateCartZod } = require("./cart.validation");
const {
  createCart,
  getCarts,
  getCart,
  updateCart,
  deleteCart,
} = require("./cart.controller");

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
    // reqValidate(createCartZod),
    createCart
  )
  /**
   * @api {get} /
   * @apiDescription ger all carts
   * @apiPermission all
   **/
  // .get(auth(USER_ROLE.ADMIN), createCart);
  .get(getCarts);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get a single cart
   * @apiPermission all
   **/
  .get(getCart)
  /**
   * @api {patch} /
   * @apiDescription update a single cart
   * @apiPermission all
   **/
  .patch(reqValidate(updateCartZod), updateCart)
  /**
   * @api {delete} /
   * @apiDescription delete a single cart
   * @apiPermission all
   **/
  .delete(deleteCart);

module.exports = router;
