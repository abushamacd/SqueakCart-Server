const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const fs = require("fs");
const {
  cloudInaryUploadImg,
  cloudInaryDeleteImg,
} = require("../../../src/utilities/cloudinary");
const { blogSearchableFields, blogPopulate } = require("./blog.constant");
const Blog = require("./blog.model");

exports.createBlogService = async (payload) => {
  const blog = await Blog.create(payload);
  if (!blog) {
    throw new Error("Blog create failed");
  }
  const result = await Blog.findById(blog._id).populate([
    "category",
    "likes",
    "dislikes",
  ]);
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
    .populate(blogPopulate)
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
  const result = await Blog.findByIdAndUpdate(
    { _id: id },
    { $inc: { views: 1 } },
    { new: true }
  ).populate(blogPopulate);
  return result;
};

exports.updateBlogService = async (id, payload) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate(blogPopulate);
  return result;
};

exports.deleteBlogService = async (id) => {
  const result = await Blog.findByIdAndDelete(id).populate([
    "category",
    "likes",
    "dislikes",
  ]);
  return result;
};

exports.likeBlogService = async (blogId, loginUserId) => {
  const blog = await Blog.findById(blogId);

  const isLiked = blog?.likes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );

  const alreadyDisliked = blog?.dislikes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );

  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
      },
      {
        new: true,
      }
    ).populate(blogPopulate);
  }

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
      },
      {
        new: true,
      }
    ).populate(blogPopulate);
    return blog;
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
      },
      {
        new: true,
      }
    ).populate(blogPopulate);
    return blog;
  }
};

exports.dislikeBlogService = async (blogId, loginUserId) => {
  const blog = await Blog.findById(blogId);
  const isDisliked = blog?.dislikes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  const alreadyLiked = blog?.likes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );

  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
      },
      {
        new: true,
      }
    );
  }

  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
      },
      {
        new: true,
      }
    ).populate(blogPopulate);
    return blog;
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
      },
      {
        new: true,
      }
    ).populate(blogPopulate);
    return blog;
  }
};

exports.blogImageUploadService = async (files) => {
  const uploader = (path) => cloudInaryUploadImg(path, "images");
  const urls = [];
  for (const file of files) {
    const { path } = file;
    let newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  const images = urls?.map((file) => {
    return file;
  });

  return images;
};

exports.blogImageDeleteService = async (id, files) => {
  const deleted = await cloudInaryDeleteImg(id, "images");
  return deleted;
};
