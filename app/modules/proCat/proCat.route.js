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
  uploadImages,
  deleteImages,
} = require("./proCat.controller");
const {
  proCatImageResize,
  uploadFile,
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
    proCatImageResize,
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
    proCatImageResize,
    deleteImages
  );

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
