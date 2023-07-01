const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { createUserZod, updateUserZod } = require("./user.validation");
const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("./user.controller");
const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create user
   * @apiPermission all
   **/
  .post(reqValidate(createUserZod), createUser)
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission admin
   **/
  .get(
    //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
    getAllUsers
  );

router
  .route("/:id")
  /**
   * @api {get} /64a04b3a3babaf9f69752398
   * @apiDescription get single user by
   * @apiPermission admin
   **/
  .get(
    // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
    getSingleUser
  )
  /**
   * @api {patch} /64a04b3a3babaf9f69752398
   * @apiDescription update single user by
   * @apiPermission admin
   **/
  .patch(
    reqValidate(updateUserZod),
    // auth(ENUM_USER_ROLE.SELLER),
    updateUser
  )
  /**
   * @api {delete} /64a04b3a3babaf9f69752398
   * @apiDescription delete single user by
   * @apiPermission admin
   **/
  .delete(
    //   auth(ENUM_USER_ROLE.SELLER),
    deleteUser
  );

module.exports = router;
