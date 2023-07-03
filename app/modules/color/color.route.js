const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const { createColorZod, updateColorZod } = require("./color.validation");
const {
  createColor,
  getColors,
  getColor,
  updateColor,
  deleteColor,
} = require("./color.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create contact
   * @apiPermission all
   **/
  .post(reqValidate(createColorZod), createColor)
  /**
   * @api {get} /
   * @apiDescription ger all contacts
   * @apiPermission all
   **/
  // .get(auth(USER_ROLE.ADMIN), createColor);
  .get(getColors);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get a single contact
   * @apiPermission all
   **/
  .get(getColor)
  /**
   * @api {patch} /
   * @apiDescription update a single contact
   * @apiPermission all
   **/
  .patch(reqValidate(updateColorZod), updateColor)
  /**
   * @api {delete} /
   * @apiDescription delete a single contact
   * @apiPermission all
   **/
  .delete(deleteColor);

module.exports = router;
