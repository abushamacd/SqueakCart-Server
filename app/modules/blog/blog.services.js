const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const { blogSearchableFields } = require("./blog.constant");
const Blog = require("./blog.model");

exports.createBlogService = async (payload) => {
  const blog = await Blog.create(payload);
  if (!blog) {
    throw new Error("Blog create failed");
  }
  const result = await Blog.findById(blog._id).populate("category");
  return result;
};

exports.getBlogsService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: blogSearchableFields.map((field) => ({
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
  const result = await Blog.find(whereConditions)
    .populate("category")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.getBlogService = async (id) => {
  const result = await Blog.findById(id).populate("category");
  return result;
};

exports.updateBlogService = async (id, payload) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate("category");
  return result;
};

exports.deleteBlogService = async (id) => {
  const result = await Blog.findByIdAndDelete(id).populate("category");
  return result;
};
