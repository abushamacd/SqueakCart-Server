const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const { contactSearchableFields } = require("./contact.constant");
const Contact = require("./contact.model");

exports.createContactService = async (payload) => {
  const contact = await Contact.create(payload);
  if (!contact) {
    throw new Error("Contact create failed");
  }
  const result = await Contact.findById(contact._id);
  return result;
};

exports.getContactsService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: contactSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // filtering on field
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }

  // sorting
  let sortConditions = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  // output
  const result = await Contact.find(whereConditions)
    .populate("")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Contact.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.getContactService = async (id) => {
  const result = await Contact.findById(id);
  return result;
};

exports.updateContactService = async (id, payload) => {
  const result = await Contact.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

exports.deleteContactService = async (id) => {
  const result = await Contact.findByIdAndDelete(id);
  return result;
};
