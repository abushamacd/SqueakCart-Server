const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const { createAddressZod, updateAddressZod } = require("./address.validation");
const {
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
} = require("./address.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create address
   * @apiPermission all
   **/
  .post(
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    reqValidate(createAddressZod),
    createAddress
  )
  /**
   * @api {get} /
   * @apiDescription get address by user id
   * @apiPermission all
   **/
  .get(auth(USER_ROLE.ADMIN, USER_ROLE.USER), getAddresses);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get address by user id
   * @apiPermission all
   **/
  .get(auth(USER_ROLE.ADMIN, USER_ROLE.USER), getAddress)
  /**
   * @api {patch} /
   * @apiDescription update a single address
   * @apiPermission all
   **/
  .patch(
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    reqValidate(updateAddressZod),
    updateAddress
  )
  /**
   * @api {delete} /
   * @apiDescription delete a single address
   * @apiPermission all
   **/
  .delete(auth(USER_ROLE.ADMIN, USER_ROLE.USER), deleteAddress);

module.exports = router;
