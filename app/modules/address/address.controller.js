const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createAddressService,
  getAddressesService,
  getAddressService,
  updateAddressService,
  deleteAddressService,
} = require("./address.services");
const { pick } = require("../../../src/utilities/pick");
const { addressFilterableFields } = require("./address.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createAddress = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const result = await createAddressService(_id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address created successfully",
    data: result,
  });
});

exports.getAddresses = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const result = await getAddressesService(_id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address retrived successfully",
    data: result,
  });
});

exports.getAddress = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const { id } = req?.params;
  const result = await getAddressService(_id, id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address retrived successfully",
    data: result,
  });
});

exports.updateAddress = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const { id } = req?.params;
  const result = await updateAddressService(_id, id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address update successfully",
    data: result,
  });
});

exports.deleteAddress = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const { id } = req?.params;
  const result = await deleteAddressService(_id, id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address delete successfully",
    data: result,
  });
});
