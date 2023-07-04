const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const {
  createProductZod,
  updateProductZod,
  ratingZod,
} = require("./product.validation");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImages,
  deleteImages,
  rating,
} = require("./product.controller");
const {
  uploadFile,
  productImageResize,
} = require("../../../src/middleware/uploadImages");

const router = express.Router();

router
  .route("/rating")
  /**
   * @api {patch} /rating
   * @apiDescription give prodcut rating
   * @apiPermission all
   */
  .patch(reqValidate(ratingZod), auth(USER_ROLE.ADMIN, USER_ROLE.USER), rating);

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
    productImageResize,
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
    productImageResize,
    deleteImages
  );

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create product
   * @apiPermission all
   **/
  .post(reqValidate(createProductZod), createProduct)
  /**
   * @api {get} /
   * @apiDescription ger all products
   * @apiPermission all
   **/
  // .get(auth(USER_ROLE.ADMIN), createProduct);
  .get(getProducts);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get a single product
   * @apiPermission all
   **/
  .get(getProduct)
  /**
   * @api {patch} /
   * @apiDescription update a single product
   * @apiPermission all
   **/
  .patch(reqValidate(updateProductZod), updateProduct)
  /**
   * @api {delete} /
   * @apiDescription delete a single product
   * @apiPermission all
   **/
  .delete(deleteProduct);

module.exports = router;
