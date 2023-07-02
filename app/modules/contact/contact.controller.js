const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const { createContactService } = require("./contact.services");

exports.createContact = tryCatch(async (req, res) => {
  const result = await createContactService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact created successfully",
    data: result,
  });
});
