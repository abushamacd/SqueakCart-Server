const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createContactService,
  getContactsService,
  getContactService,
  updateContactService,
  deleteContactService,
} = require("./contact.services");
const { pick } = require("../../../src/utilities/pick");
const { contactFilterableFields } = require("./contact.constant");
const { paginationFields } = require("../../../src/constants/pagination");

exports.createContact = tryCatch(async (req, res) => {
  const result = await createContactService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message send successfully",
    data: result,
  });
});

exports.getContacts = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, contactFilterableFields);
  const result = await getContactsService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contacts retrived successfully",
    data: result,
  });
});

exports.getContact = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getContactService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact retrived successfully",
    data: result,
  });
});

exports.updateContact = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await updateContactService(id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact update successfully",
    data: result,
  });
});

exports.deleteContact = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteContactService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact delete successfully",
    data: result,
  });
});
