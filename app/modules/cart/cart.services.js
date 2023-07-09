const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const Product = require("../product/product.model");
const User = require("../user/user.model");
const { cartSearchableFields } = require("./cart.constant");
const Cart = require("./cart.model");

exports.createCartService = async (id, payload) => {
  // console.log(payload);
  // let products = [];
  const user = await User.findById(id);
  const alreadyAdded = await Cart.find({ orderby: user._id }).populate(
    "orderby"
  );

  console.log(alreadyAdded);
  if (alreadyAdded) {
  }
  // for (let i = 0; i < payload.length; i++) {
  //   let item = {};
  //   item.product = payload[i]._id;
  //   item.count = payload[i].count;
  //   item.color = payload[i].color;
  //   let getPrice = await Product.findById(payload[i]._id)
  //     .select("price")
  //     .exec();
  //   item.price = getPrice.price;
  //   products.push(item);
  // }
  // let cartTotal = 0;
  // for (let i = 0; i < products.length; i++) {
  //   cartTotal = cartTotal + products[i].price * products[i].count;
  // }

  // let newcart = await new Cart({
  //   products,
  //   cartTotal,
  //   orderby: user?._id,
  // }).save();

  return alreadyAdded;
};

exports.getCartsService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: cartSearchableFields.map((field) => ({
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
  const result = await Cart.find(whereConditions)
    .populate("")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cart.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.getCartService = async (id) => {
  const result = await Cart.findById(id);
  return result;
};

exports.updateCartService = async (id, payload) => {
  const result = await Cart.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

exports.deleteCartService = async (id) => {
  const result = await Cart.findByIdAndDelete(id);
  return result;
};
