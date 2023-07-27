const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const fs = require("fs");
const {
  cloudInaryUploadImg,
  cloudInaryDeleteImg,
} = require("../../../src/utilities/cloudinary");
const {
  productSearchableFields,
  productPopulate,
} = require("./product.constant");
const Product = require("./product.model");

exports.createProductService = async (payload) => {
  const product = await Product.create(payload);
  if (!product) {
    throw new Error("Product create failed");
  }
  const result = await Product.findById(product._id).populate(productPopulate);
  return result;
};

exports.getProductsService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map((field) => ({
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
  const result = await Product.find(whereConditions)
    .populate(productPopulate)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.getProductService = async (id) => {
  const result = await Product.findByIdAndUpdate(
    { _id: id },
    { $inc: { view: 1 } },
    { new: true }
  ).populate(productPopulate);
  return result;
};

exports.updateProductService = async (id, payload) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate(productPopulate);
  return result;
};

exports.deleteProductService = async (id) => {
  const result = await Product.findByIdAndDelete(id).populate(productPopulate);
  return result;
};

exports.productImageUploadService = async (files) => {
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

exports.productImageDeleteService = async (id, files) => {
  const deleted = await cloudInaryDeleteImg(id, "images");
  return deleted;
};

exports.ratingService = async (id, payload) => {
  const { star, productId, comment } = payload;
  const product = await Product.findById(productId);
  let aleardyRated = product.ratings.find(
    (userId) => userId.postedby.toString() === id.toString()
  );
  // individuals rating handle
  if (aleardyRated) {
    const updateRating = await Product.updateOne(
      {
        ratings: { $elemMatch: aleardyRated },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      {
        new: true,
      }
    );
  } else {
    const rateProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          ratings: {
            star: star,
            comment: comment,
            postedby: id,
          },
        },
      },
      {
        new: true,
      }
    );
  }

  // handle total rating
  const getAllRatings = await Product.findById(productId);
  let totalRatting = getAllRatings.ratings.length;
  let ratingSum = getAllRatings.ratings
    .map((item) => item.star)
    .reduce((previous, current) => previous + current, 0);
  let newRating = Math.round(ratingSum / totalRatting);
  let ratedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      totalrating: newRating,
    },
    {
      new: true,
    }
  ).populate(productPopulate);

  return ratedProduct;
};
