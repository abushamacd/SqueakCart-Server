const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const { couponSearchableFields } = require("./coupon.constant");
const Coupon = require("./coupon.model");

exports.createCouponService = async (payload) => {
  const coupon = await Coupon.create(payload);
  if (!coupon) {
    throw new Error("Coupon create failed");
  }
  const result = await Coupon.findById(coupon._id);
  return result;
};

exports.getCouponsService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: couponSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // filtering on field
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }

  // sorting
  let sortConditions = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  // output
  const result = await Coupon.find(whereConditions)
    .populate("")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Coupon.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.getCouponService = async (id) => {
  const result = await Coupon.findById(id);
  return result;
};

exports.updateCouponService = async (id, payload) => {
  const result = await Coupon.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

exports.deleteCouponService = async (id) => {
  const result = await Coupon.findByIdAndDelete(id);
  return result;
};
