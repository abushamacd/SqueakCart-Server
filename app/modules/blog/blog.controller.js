const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createBlogService,
  getBlogsService,
  getBlogService,
  updateBlogService,
  deleteBlogService,
} = require("./blog.services");
const { pick } = require("../../../src/utilities/pick");
const { blogFilterableFields } = require("./blog.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createBlog = tryCatch(async (req, res) => {
  const result = await createBlogService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

exports.getBlogs = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, blogFilterableFields);
  const result = await getBlogsService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blogs retrived successfully",
    data: result,
  });
});

exports.getBlog = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getBlogService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog retrived successfully",
    data: result,
  });
});

exports.updateBlog = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await updateBlogService(id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog update successfully",
    data: result,
  });
});

exports.deleteBlog = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteBlogService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog delete successfully",
    data: result,
  });
});
