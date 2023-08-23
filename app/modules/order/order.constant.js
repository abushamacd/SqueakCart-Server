exports.orderFilterableFields = ["searchTerm", "title"];
exports.status = ["increase", "decrease"];
exports.orderSearchableFields = ["title"];
exports.orderPopulate = [
  "orderBy",
  {
    path: "products",
    populate: [
      "productId",
      "color",
      // {
      //   path: "productId",
      // },
      // {
      //   path: "color",
      // },
    ],
  },
];
