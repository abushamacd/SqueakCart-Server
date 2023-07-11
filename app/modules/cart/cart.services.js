const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const Product = require("../product/product.model");
const User = require("../user/user.model");
const { cartSearchableFields, cartPopulate } = require("./cart.constant");
const Cart = require("./cart.model");

exports.createCartService = async (id, payload) => {
  // const user = await User.findById(id);
  // if (!user) {
  //   throw new Error("User is deleted");
  // }
  // let products = [];
  // let cartTotal = 0;
  // let result = null;
  // const { productId, count, color, price } = payload;
  // const userCart = await Cart.findOne({ orderBy: user._id });
  // const allProducts = userCart.products;

  // if (userCart) {
  //   console.log("old cart");
  //   const allVarients = allProducts.filter(
  //     (product) => product.productId.valueOf() === productId
  //   );
  //   if (allVarients.length > 0) {
  //     console.log("old product");
  //     const remainsVarients = allVarients.filter(
  //       (product) => product.color !== color
  //     );
  //     products.push(payload);
  //     products.push(...remainsVarients);

  //     const remainsProducts = allProducts.filter((obj1) => {
  //       return products.some(
  //         (obj2) => obj1.productId.valueOf() !== obj2.productId.valueOf()
  //       );
  //     });
  //     products.push(...remainsProducts);
  //   } else {
  //     console.log("new product");
  //     products.push(payload);
  //     products.push(...allProducts);
  //   }

  //   for (let i = 0; i < products.length; i++) {
  //     cartTotal = cartTotal + products[i].price * products[i].count;
  //   }

  //   const savedCart = await Cart.findByIdAndUpdate(userCart._id, {
  //     products,
  //     cartTotal,
  //     orderBy: id,
  //   });

  //   result = await Cart.findById(savedCart._id).populate(cartPopulate);
  // } else {
  //   console.log("new cart");
  //   products.push(payload);
  //   for (let i = 0; i < products.length; i++) {
  //     cartTotal = cartTotal + products[i].price * products[i].count;
  //   }
  //   const savedCart = await new Cart({
  //     products,
  //     cartTotal,
  //     orderBy: id,
  //   }).save();

  //   result = await Cart.findById(savedCart._id).populate(cartPopulate);
  // }

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
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User is deleted");
  }
  let products = [];
  let cartTotal = 0;
  let result = null;
  const userCart = await Cart.findOne({ orderBy: user._id });
  const allProducts = userCart.products;

  if (userCart) {
    console.log("old cart");
    const allVarients = allProducts.filter(
      (product) => product.productId.valueOf() === productId
    );
    if (allVarients.length > 0) {
      console.log("old product");
      const remainsVarients = allVarients.filter(
        (product) => product.color !== color
      );
      products.push(payload);
      products.push(...remainsVarients);

      const remainsProducts = allProducts.filter((obj1) => {
        return products.some(
          (obj2) => obj1.productId.valueOf() !== obj2.productId.valueOf()
        );
      });
      products.push(...remainsProducts);
    } else {
      console.log("new product");
      products.push(payload);
      products.push(...allProducts);
    }

    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    const savedCart = await Cart.findByIdAndUpdate(userCart._id, {
      products,
      cartTotal,
      orderBy: id,
    });

    result = await Cart.findById(savedCart._id).populate(cartPopulate);
  }

  return result;
};
