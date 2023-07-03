const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const { createBrandZod, updateBrandZod } = require("./brand.validation");
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("./brand.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create brand
   * @apiPermission all
   **/
  .post(reqValidate(createBrandZod), createBrand)
  /**
   * @api {get} /
   * @apiDescription ger all brands
   * @apiPermission all
   **/
  // .get(auth(USER_ROLE.ADMIN), createBrand);
  .get(getBrands);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get a single brand
   * @apiPermission all
   **/
  .get(getBrand)
  /**
   * @api {patch} /
   * @apiDescription update a single brand
   * @apiPermission all
   **/
  .patch(reqValidate(updateBrandZod), updateBrand)
  /**
   * @api {delete} /
   * @apiDescription delete a single brand
   * @apiPermission all
   **/
  .delete(deleteBrand);

module.exports = router;
