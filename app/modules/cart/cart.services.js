const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const Product = require("../product/product.model");
const User = require("../user/user.model");
const { cartSearchableFields, cartPopulate } = require("./cart.constant");
const Cart = require("./cart.model");

exports.createCartService = async (id, payload) => {
  let products = [];
  const { productId, count, color, price } = payload;
  const userCart = await Cart.findOne({ orderBy: id });
  const allProducts = userCart ? userCart.products : [];

  const allVarients = allProducts.filter(
    (product) => product.productId.valueOf() === productId
  );
  const remainsVarients = allVarients.filter(
    (product) => product.color !== color
  );

  products = [payload, ...remainsVarients];
  const remainsProducts = allProducts.filter(
    (obj1) =>
      !products.some(
        (obj2) => obj1.productId.valueOf() === obj2.productId.valueOf()
      )
  );

  products = [...products, ...remainsProducts];

  let cartTotal = products.reduce(
    (total, product) => total + product.price * product.count,
    0
  );

  const cartData = {
    products,
    cartTotal,
    orderBy: id,
  };

  const savedCart = userCart
    ? await Cart.findByIdAndUpdate(userCart._id, cartData)
    : await new Cart(cartData).save();

  const result = await Cart.findById(savedCart._id).populate(cartPopulate);

  return result;
};

exports.getCartService = async (id) => {
  const result = await Cart.find({ orderBy: id }).populate(cartPopulate);
  return result;
};

exports.clearCartService = async (id) => {
  const result = await Cart.findOneAndDelete({ orderBy: id }).populate(
    cartPopulate
  );
  return result;
};

exports.removeFromCartService = async (id, productId, color) => {
  let products = [];
  const userCart = await Cart.findOne({ orderBy: id });
  const allProducts = userCart.products;
  const allVarients = allProducts.filter(
    (product) => product.productId.valueOf() === productId
  );
  const remainsVarients = allVarients.filter(
    (product) => product.color !== color
  );
  products = [...remainsVarients];

  const remainsProducts = allProducts.filter(
    (obj1) =>
      !products.some(
        (obj2) => obj1.productId.valueOf() === obj2.productId.valueOf()
      )
  );
  products = [...products, ...remainsProducts];

  const cartTotal = products.reduce(
    (total, product) => total + product.price * product.count,
    0
  );

  const result = await Cart.findByIdAndUpdate(
    userCart._id,
    {
      products,
      cartTotal,
      orderBy: id,
    },
    {
      new: true,
    }
  ).populate(cartPopulate);
  return result;
};

exports.handleQuantityService = async (id, productId, payload) => {
  let products = [];
  const { color, status } = payload;
  const userCart = await Cart.findOne({ orderBy: id });
  const allProducts = userCart.products;
  const allVarients = allProducts.filter(
    (product) => product.productId.valueOf() === productId
  );
  const remainsVarients = allVarients.filter(
    (product) => product.color !== color
  );
  products = [...remainsVarients];
  const matchVarients = allVarients.filter(
    (product) => product.color === color
  );

  // quantity handle
  if (status === "increase") {
    matchVarients[0].count += 1;
    products = [...products, ...matchVarients];
  } else {
    if (matchVarients[0].count > 1) {
      matchVarients[0].count -= 1;
      products = [...products, ...matchVarients];
    }
  }

  const remainsProducts = allProducts.filter(
    (obj1) =>
      !products.some(
        (obj2) => obj1.productId.valueOf() === obj2.productId.valueOf()
      )
  );
  products = [...products, ...remainsProducts];

  const cartTotal = products.reduce(
    (total, product) => total + product.price * product.count,
    0
  );

  const result = await Cart.findByIdAndUpdate(
    userCart._id,
    {
      products,
      cartTotal,
      orderBy: id,
    },
    {
      new: true,
    }
  ).populate(cartPopulate);

  return result;
};
