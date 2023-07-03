const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createBlogCatService,
  getBlogCatsService,
  getBlogCatService,
  updateBlogCatService,
  deleteBlogCatService,
} = require("./blogCat.services");
const { pick } = require("../../../src/utilities/pick");
const { blogCatFilterableFields } = require("./blogCat.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createBlogCat = tryCatch(async (req, res) => {
  const result = await createBlogCatService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BlogCat created successfully",
    data: result,
  });
});

exports.getBlogCats = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, blogCatFilterableFields);
  const result = await getBlogCatsService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BlogCats retrived successfully",
    data: result,
  });
});

exports.getBlogCat = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getBlogCatService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BlogCat retrived successfully",
    data: result,
  });
});

exports.updateBlogCat = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await updateBlogCatService(id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BlogCat update successfully",
    data: result,
  });
});

exports.deleteBlogCat = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteBlogCatService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BlogCat delete successfully",
    data: result,
  });
});
