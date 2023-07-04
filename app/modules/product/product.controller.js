const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createProductService,
  getProductsService,
  getProductService,
  updateProductService,
  deleteProductService,
  productImageUploadService,
  productImageDeleteService,
  ratingService,
} = require("./product.services");
const { pick } = require("../../../src/utilities/pick");
const { productFilterableFields } = require("./product.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createProduct = tryCatch(async (req, res) => {
  const result = await createProductService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

exports.getProducts = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, productFilterableFields);
  const result = await getProductsService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrived successfully",
    data: result,
  });
});

exports.getProduct = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getProductService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrived successfully",
    data: result,
  });
});

exports.updateProduct = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await updateProductService(id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product update successfully",
    data: result,
  });
});

exports.deleteProduct = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteProductService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product delete successfully",
    data: result,
  });
});

exports.uploadImages = tryCatch(async (req, res) => {
  const files = req.files;
  const result = await productImageUploadService(files);
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
  const result = await productImageDeleteService(id, files);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product image delete successfully",
    data: result,
  });
});

exports.rating = tryCatch(async (req, res) => {
  const { _id } = req.user;
  const result = await ratingService(_id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product rating successfully",
    data: result,
  });
});
