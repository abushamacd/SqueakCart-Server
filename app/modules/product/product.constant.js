exports.productFilterableFields = [
  "searchTerm",
  "status",
  "category",
  "brand",
  "color",
  "minPrice",
  "maxPrice",
];
exports.productSearchableFields = ["title"];
exports.status = ["available", "unavailable"];
exports.productPopulate = [
  "category",
  "color",
  "brand",
  {
    path: "ratings",
    populate: [
      {
        path: "postedby",
      },
    ],
  },
];
