const Contact = require("./contact.model");

exports.createContactService = async (payload) => {
  const contact = await Contact.create(payload);
  if (!contact) {
    throw new Error("Contact create failed");
  }
  const result = await Contact.findById(contact._id);
  return result;
};
