const express = require("express");
const router = express.Router();
const userRoute = require("../modules/user/user.route");
const authRoute = require("../modules/auth/auth.route");
const contactRoute = require("../modules/contact/contact.route");
const colorRoute = require("../modules/color/color.route");
const couponRoute = require("../modules/coupon/coupon.route");
const brandRoute = require("../modules/brand/brand.route");
const blogCatRoute = require("../modules/blogCat/blogCat.route");
const proCatRoute = require("../modules/proCat/proCat.route");
const blogRoute = require("../modules/blog/blog.route");
const productRoute = require("../modules/product/product.route");
const addressRoute = require("../modules/address/address.route");
const cartRoute = require("../modules/cart/cart.route");

const appRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/contact",
    route: contactRoute,
  },
  {
    path: "/color",
    route: colorRoute,
  },
  {
    path: "/coupon",
    route: couponRoute,
  },
  {
    path: "/brand",
    route: brandRoute,
  },
  {
    path: "/blogCat",
    route: blogCatRoute,
  },
  {
    path: "/proCat",
    route: proCatRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/address",
    route: addressRoute,
  },
  {
    path: "/cart",
    route: cartRoute,
  },
];

appRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
