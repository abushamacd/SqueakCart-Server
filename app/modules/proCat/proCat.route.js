const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const { createProCatZod, updateProCatZod } = require("./proCat.validation");
const {
  createProCat,
  getProCats,
  getProCat,
  updateProCat,
  deleteProCat,
} = require("./proCat.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create proCat
   * @apiPermission all
   **/
  .post(reqValidate(createProCatZod), createProCat)
  /**
   * @api {get} /
   * @apiDescription ger all proCats
   * @apiPermission all
   **/
  // .get(auth(USER_ROLE.ADMIN), createProCat);
  .get(getProCats);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get a single proCat
   * @apiPermission all
   **/
  .get(getProCat)
  /**
   * @api {patch} /
   * @apiDescription update a single proCat
   * @apiPermission all
   **/
  .patch(reqValidate(updateProCatZod), updateProCat)
  /**
   * @api {delete} /
   * @apiDescription delete a single proCat
   * @apiPermission all
   **/
  .delete(deleteProCat);

module.exports = router;
