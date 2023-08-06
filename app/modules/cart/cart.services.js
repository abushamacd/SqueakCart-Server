const { default: mongoose } = require("mongoose");
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
  const user = await User.findById(id);
  const userCart = await Cart.findOne({ orderBy: id });
  const allProducts = userCart ? userCart.products : [];

  const allVarients = allProducts.filter(
    (product) => product.productId.valueOf() === productId
  );

  const remainsVarients = allVarients.filter(
    (product) => product.color.toString() !== color
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

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const savedCart = userCart
      ? await Cart.findByIdAndUpdate(userCart._id, cartData)
      : await new Cart(cartData).save();

    const alreadyAdded = user.cart.find(
      (id) => id.toString() === savedCart._id.valueOf().toString()
    );

    if (!alreadyAdded) {
      await User.findByIdAndUpdate(
        id,
        {
          $push: { cart: savedCart._id },
        },
        {
          new: true,
        }
      );
    }

    const result = await Cart.findById(savedCart._id);
    return result;
  } catch (error) {
    session.abortTransaction();
    throw new Error("Product added failed");
  }
};

exports.getCartService = async (id) => {
  const result = await Cart.find({ orderBy: id }).populate(cartPopulate);
  return result;
};

exports.clearCartService = async (id) => {
  const user = await User.findById(id);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await Cart.findOneAndDelete({ orderBy: id }).populate(
      cartPopulate
    );

    const alreadyAdded = user.cart.find(
      (id) => id.toString() === result._id.valueOf().toString()
    );
    if (alreadyAdded) {
      await User.findByIdAndUpdate(
        id,
        {
          $pull: { cart: result._id },
        },
        {
          new: true,
        }
      );
    }

    return result;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
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
      !allVarients.some(
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
      !allVarients.some(
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
