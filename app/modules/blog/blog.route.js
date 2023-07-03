const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const { createBlogZod, updateBlogZod } = require("./blog.validation");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
} = require("./blog.controller");

const router = express.Router();

router
  .route("/likes")
  /**
   * @api {patch} /likes
   * @apiDescription like blog
   * @apiPermission all
   */
  .patch(auth(USER_ROLE.USER, USER_ROLE.ADMIN), likeBlog);

router
  .route("/dislikes")
  /**
   * @api {patch} /likes
   * @apiDescription like blog
   * @apiPermission all
   */
  .patch(auth(USER_ROLE.USER, USER_ROLE.ADMIN), dislikeBlog);

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create blog
   * @apiPermission all
   **/
  .post(reqValidate(createBlogZod), createBlog)
  /**
   * @api {get} /
   * @apiDescription ger all blogs
   * @apiPermission all
   **/
  // .get(auth(USER_ROLE.ADMIN), createBlog);
  .get(getBlogs);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get a single blog
   * @apiPermission all
   **/
  .get(getBlog)
  /**
   * @api {patch} /
   * @apiDescription update a single blog
   * @apiPermission all
   **/
  .patch(reqValidate(updateBlogZod), updateBlog)
  /**
   * @api {delete} /
   * @apiDescription delete a single blog
   * @apiPermission all
   **/
  .delete(deleteBlog);

module.exports = router;
