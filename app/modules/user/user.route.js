const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const {
  createUserZod,
  updateUserZod,
  wishlistZod,
} = require("./user.validation");
const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addToWishList,
  getWishList,
  getUserProfile,
} = require("./user.controller");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const router = express.Router();

router
  .route("/profile")
  /**
   * @api {get} /profile
   * @apiDescription add product to wishlist
   * @apiPermission all
   **/
  .get(auth(USER_ROLE.ADMIN, USER_ROLE.USER), getUserProfile);

router
  .route("/wishlist")
  /**
   * @api {patch} /wishlist
   * @apiDescription add product to wishlist
   * @apiPermission all
   **/
  .patch(
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    reqValidate(wishlistZod),
    addToWishList
  )
  /**
   * @api {get} /wishlist
   * @apiDescription add product from wishlist
   * @apiPermission all
   **/
  .get(auth(USER_ROLE.ADMIN, USER_ROLE.USER), getWishList);

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
