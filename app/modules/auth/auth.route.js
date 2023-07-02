const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const {
  loginUserZod,
  refreshTokenZod,
  changePasswordZod,
  forgetPasswordZod,
  resetPasswordZod,
} = require("./auth.validation");
const {
  loginUser,
  refreshToken,
  changePassword,
  setRole,
  setRestriction,
  forgetPassword,
  resetPassword,
} = require("./auth.controller");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");

const router = express.Router();

router
  .route("/login")
  /**
   * @api {post} /login
   * @apiDescription user login
   * @apiPermission all
   **/
  .post(reqValidate(loginUserZod), loginUser);

router
  .route("/refresh-token")
  /**
   * @api {post} /
   * @apiDescription create user
   * @apiPermission all
   **/
  .post(reqValidate(refreshTokenZod), refreshToken);

router
  .route("/change-password")
  /**
   * @api {post} /
   * @apiDescription create user
   * @apiPermission all
   **/
  .post(reqValidate(changePasswordZod), changePassword);

router
  .route("/forget-password")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .post(reqValidate(forgetPasswordZod), forgetPassword);

router
  .route("/reset-password/:token")
  /**
   * @api {get} /
   * @apiDescription get all user
   * @apiPermission all
   */
  .patch(reqValidate(resetPasswordZod), resetPassword);

router
  .route("/set-role/:id")
  /**
   * @api {post} /
   * @apiDescription make and remove admin role
   * @apiPermission admin
   **/
  .patch(auth(USER_ROLE.ADMIN), setRole);

router
  .route("/set-restriction/:id")
  /**
   * @api {post} /
   * @apiDescription user block and unblock
   * @apiPermission admin
   **/
  .patch(auth(USER_ROLE.ADMIN), setRestriction);

module.exports = router;
