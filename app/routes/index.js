const express = require("express");
const router = express.Router();
const userRoute = require("../modules/user/user.route");
const authRoute = require("../modules/auth/auth.route");
const contactRoute = require("../modules/contact/contact.route");

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
];

appRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
