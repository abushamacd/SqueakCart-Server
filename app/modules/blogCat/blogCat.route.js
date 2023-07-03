const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const { createBlogCatZod, updateBlogCatZod } = require("./blogCat.validation");
const {
  createBlogCat,
  getBlogCats,
  getBlogCat,
  updateBlogCat,
  deleteBlogCat,
} = require("./blogCat.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create blogCat
   * @apiPermission all
   **/
  .post(reqValidate(createBlogCatZod), createBlogCat)
  /**
   * @api {get} /
   * @apiDescription ger all blogCats
   * @apiPermission all
   **/
  // .get(auth(USER_ROLE.ADMIN), createBlogCat);
  .get(getBlogCats);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get a single blogCat
   * @apiPermission all
   **/
  .get(getBlogCat)
  /**
   * @api {patch} /
   * @apiDescription update a single blogCat
   * @apiPermission all
   **/
  .patch(reqValidate(updateBlogCatZod), updateBlogCat)
  /**
   * @api {delete} /
   * @apiDescription delete a single blogCat
   * @apiPermission all
   **/
  .delete(deleteBlogCat);

module.exports = router;
