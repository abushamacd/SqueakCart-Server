const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createProCatService,
  getProCatsService,
  getProCatService,
  updateProCatService,
  deleteProCatService,
  proCatImageUploadService,
  proCatImageDeleteService,
} = require("./proCat.services");
const { pick } = require("../../../src/utilities/pick");
const { proCatFilterableFields } = require("./proCat.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createProCat = tryCatch(async (req, res) => {
  const result = await createProCatService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ProCat created successfully",
    data: result,
  });
});

exports.getProCats = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, proCatFilterableFields);
  const result = await getProCatsService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ProCats retrived successfully",
    data: result,
  });
});

exports.getProCat = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getProCatService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ProCat retrived successfully",
    data: result,
  });
});

exports.updateProCat = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await updateProCatService(id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ProCat update successfully",
    data: result,
  });
});

exports.deleteProCat = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteProCatService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ProCat delete successfully",
    data: result,
  });
});

exports.uploadImages = tryCatch(async (req, res) => {
  const files = req.files;
  const result = await proCatImageUploadService(files);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product image upload successfully",
    data: result,
  });
});

exports.deleteImages = tryCatch(async (req, res) => {
  const { id } = req.params;
  const files = req.files;
  const result = await proCatImageDeleteService(id, files);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product image delete successfully",
    data: result,
  });
});
