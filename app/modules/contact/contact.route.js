const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const { createContactZod } = require("./contact.validation");
const { createContact } = require("./contact.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /login
   * @apiDescription user login
   * @apiPermission all
   **/
  .post(reqValidate(createContactZod), createContact);

module.exports = router;
