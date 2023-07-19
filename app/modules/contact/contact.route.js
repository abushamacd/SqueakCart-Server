const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");
const { createContactZod, updateContactZod } = require("./contact.validation");
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("./contact.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /
   * @apiDescription create contact
   * @apiPermission all
   **/
  .post(reqValidate(createContactZod), createContact)
  /**
   * @api {get} /
   * @apiDescription ger all contacts
   * @apiPermission all
   **/
  .get(auth(USER_ROLE.ADMIN), getContacts);

router
  .route("/:id")
  /**
   * @api {get} /
   * @apiDescription get a single contact
   * @apiPermission all
   **/
  .get(auth(USER_ROLE.ADMIN), getContact)
  /**
   * @api {patch} /
   * @apiDescription update a single contact
   * @apiPermission all
   **/
  .patch(auth(USER_ROLE.ADMIN), reqValidate(updateContactZod), updateContact)
  /**
   * @api {delete} /
   * @apiDescription delete a single contact
   * @apiPermission all
   **/
  .delete(auth(USER_ROLE.ADMIN), deleteContact);

module.exports = router;
