const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const { addressSearchableFields } = require("./address.constant");
const Address = require("./address.model");

exports.createAddressService = async (id, payload) => {
  payload.userId = id;
  const address = await Address.create(payload);
  if (!address) {
    throw new Error("Address create failed");
  }
  const result = await Address.findById(address._id).populate("userId");
  return result;
};

exports.getAddressesService = async (id) => {
  let sortConditions = { createdAt: "desc" };
  const result = await Address.find({ userId: id })
    .populate("userId")
    .sort(sortConditions);
  return result;
};

exports.getAddressService = async (userId, id) => {
  const result = await Address.find({ userId, _id: id }).populate("userId");
  return result;
};

exports.updateAddressService = async (userId, id, payload) => {
  const result = await Address.findOneAndUpdate({ userId, _id: id }, payload, {
    new: true,
  }).populate("userId");
  return result;
};

exports.deleteAddressService = async (userId, id) => {
  const result = await Address.findByIdAndDelete({ userId, _id: id }).populate(
    "userId"
  );
  return result;
};
