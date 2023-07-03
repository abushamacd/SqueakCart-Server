exports.productFilterableFields = ["searchTerm", "title"];
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
