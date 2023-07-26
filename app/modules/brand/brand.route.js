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
  uploadImages,
  deleteImages,
} = require("./brand.controller");
const {
  uploadFile,
  brandImageResize,
} = require("../../../src/middleware/uploadImages");

const router = express.Router();

router
  .route("/upload-img")
  /**
   * @api {post} /upload-img
   * @apiDescription upload product image
   * @apiPermission admin
   */
  .post(
    // auth(USER_ROLE.ADMIN),
    uploadFile.array("images", 10),
    brandImageResize,
    uploadImages
  );

router
  .route("/delete-img/:id")
  /**
   * @api {post} //delete-img/image_id
   * @apiDescription delete product image
   * @apiPermission admin
   */
  .delete(
    // auth(USER_ROLE.ADMIN),
    uploadFile.array("images", 10),
    brandImageResize,
    deleteImages
  );

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
