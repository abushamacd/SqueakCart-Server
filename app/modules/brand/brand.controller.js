const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createBrandService,
  getBrandsService,
  getBrandService,
  updateBrandService,
  deleteBrandService,
} = require("./brand.services");
const { pick } = require("../../../src/utilities/pick");
const { brandFilterableFields } = require("./brand.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createBrand = tryCatch(async (req, res) => {
  const result = await createBrandService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand created successfully",
    data: result,
  });
});

exports.getBrands = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, brandFilterableFields);
  const result = await getBrandsService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brands retrived successfully",
    data: result,
  });
});

exports.getBrand = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getBrandService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand retrived successfully",
    data: result,
  });
});

exports.updateBrand = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await updateBrandService(id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand update successfully",
    data: result,
  });
});

exports.deleteBrand = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteBrandService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand delete successfully",
    data: result,
  });
});
