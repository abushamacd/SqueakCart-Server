exports.cartFilterableFields = ["searchTerm", "title"];
exports.status = ["increase", "decrease"];
exports.cartSearchableFields = ["title"];
exports.cartPopulate = [
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
