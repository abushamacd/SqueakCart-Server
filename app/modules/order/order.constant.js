exports.orderFilterableFields = ["searchTerm", "title"];
exports.status = ["increase", "decrease"];
exports.orderSearchableFields = ["title"];
exports.orderPopulate = [
  "orderBy",
  {
    path: "products",
    populate: ["product", "color"],
  },
];
