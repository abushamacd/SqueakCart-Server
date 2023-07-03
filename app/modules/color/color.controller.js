const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createColorService,
  getColorsService,
  getColorService,
  updateColorService,
  deleteColorService,
} = require("./color.services");
const { pick } = require("../../../src/utilities/pick");
const { colorFilterableFields } = require("./color.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createColor = tryCatch(async (req, res) => {
  const result = await createColorService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Color created successfully",
    data: result,
  });
});

exports.getColors = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, colorFilterableFields);
  const result = await getColorsService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Colors retrived successfully",
    data: result,
  });
});

exports.getColor = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getColorService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Color retrived successfully",
    data: result,
  });
});

exports.updateColor = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await updateColorService(id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Color update successfully",
    data: result,
  });
});

exports.deleteColor = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteColorService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Color delete successfully",
    data: result,
  });
});
