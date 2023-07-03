const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const { contactSearchableFields } = require("./color.constant");
const Color = require("./color.model");

exports.createColorService = async (payload) => {
  const contact = await Color.create(payload);
  if (!contact) {
    throw new Error("Color create failed");
  }
  const result = await Color.findById(contact._id);
  return result;
};

exports.getColorsService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: contactSearchableFields.map((field) => ({
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
  const result = await Color.find(whereConditions)
    .populate("")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Color.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.getColorService = async (id) => {
  const result = await Color.findById(id);
  return result;
};

exports.updateColorService = async (id, payload) => {
  const result = await Color.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

exports.deleteColorService = async (id) => {
  const result = await Color.findByIdAndDelete(id);
  return result;
};
