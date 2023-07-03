const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const { blogCatSearchableFields } = require("./blogCat.constant");
const BlogCat = require("./blogCat.model");

exports.createBlogCatService = async (payload) => {
  const blogCat = await BlogCat.create(payload);
  if (!blogCat) {
    throw new Error("BlogCat create failed");
  }
  const result = await BlogCat.findById(blogCat._id);
  return result;
};

exports.getBlogCatsService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: blogCatSearchableFields.map((field) => ({
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
  const result = await BlogCat.find(whereConditions)
    .populate("")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await BlogCat.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.getBlogCatService = async (id) => {
  const result = await BlogCat.findById(id);
  return result;
};

exports.updateBlogCatService = async (id, payload) => {
  const result = await BlogCat.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

exports.deleteBlogCatService = async (id) => {
  const result = await BlogCat.findByIdAndDelete(id);
  return result;
};
