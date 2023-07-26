const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const {
  cloudInaryUploadImg,
  cloudInaryDeleteImg,
} = require("../../../src/utilities/cloudinary");
const { brandSearchableFields } = require("./brand.constant");
const Brand = require("./brand.model");
const fs = require("fs");

exports.createBrandService = async (payload) => {
  const brand = await Brand.create(payload);
  if (!brand) {
    throw new Error("Brand create failed");
  }
  const result = await Brand.findById(brand._id);
  return result;
};

exports.getBrandsService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: brandSearchableFields.map((field) => ({
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
  const result = await Brand.find(whereConditions)
    .populate("")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Brand.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.getBrandService = async (id) => {
  const result = await Brand.findById(id);
  return result;
};

exports.updateBrandService = async (id, payload) => {
  const result = await Brand.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

exports.deleteBrandService = async (id) => {
  const result = await Brand.findByIdAndDelete(id);
  return result;
};

exports.brandImageUploadService = async (files) => {
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

exports.brandImageDeleteService = async (id, files) => {
  const deleted = await cloudInaryDeleteImg(id, "images");
  return deleted;
};
