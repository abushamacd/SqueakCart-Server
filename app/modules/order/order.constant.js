exports.orderStatus = [
  "Not Processed",
  "Processing",
  "On Currier",
  "Delivered",
  "Cancelled",
];
exports.orderFilterableFields = ["searchTerm", "title"];
exports.status = ["increase", "decrease"];
exports.orderSearchableFields = ["title"];
exports.orderPopulate = [
  "orderBy",
  {
    path: "orderBy",
    populate: ["address"],
  },
  {
    path: "products",
    populate: ["product", "color"],
  },
];
