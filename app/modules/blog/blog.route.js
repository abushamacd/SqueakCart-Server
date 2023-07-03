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
  uploadImages,
  deleteImages,
} = require("./blog.controller");
const {
  uploadFile,
  blogImageResize,
} = require("../../../src/middleware/uploadImages");

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
  .route("/upload-img")
  /**
   * @api {post} /upload-img
   * @apiDescription upload blog image
   * @apiPermission admin
   */
  .post(
    // auth(USER_ROLE.ADMIN),
    uploadFile.array("images", 5),
    blogImageResize,
    uploadImages
  );

router
  .route("/delete-img/:id")
  /**
   * @api {post} //delete-img/image_id
   * @apiDescription delete blog image
   * @apiPermission admin
   */
  .delete(
    // auth(USER_ROLE.ADMIN),
    uploadFile.array("images", 10),
    blogImageResize,
    deleteImages
  );

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
