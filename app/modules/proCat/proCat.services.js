const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const { proCatSearchableFields } = require("./proCat.constant");
const ProCat = require("./proCat.model");

exports.createProCatService = async (payload) => {
  const proCat = await ProCat.create(payload);
  if (!proCat) {
    throw new Error("ProCat create failed");
  }
  const result = await ProCat.findById(proCat._id);
  return result;
};

exports.getProCatsService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: proCatSearchableFields.map((field) => ({
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
  const result = await ProCat.find(whereConditions)
    .populate("")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ProCat.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.getProCatService = async (id) => {
  const result = await ProCat.findById(id);
  return result;
};

exports.updateProCatService = async (id, payload) => {
  const result = await ProCat.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

exports.deleteProCatService = async (id) => {
  const result = await ProCat.findByIdAndDelete(id);
  return result;
};
