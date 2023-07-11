exports.role = ["user"];
exports.userFilterableFields = [
  "searchTerm",
  "email",
  "phone",
  "firstname",
  "lastname",
];
exports.userSearchableFields = ["email", "phone", "firstname", "lastname"];
exports.userPopulate = [
  "address",
  "wishlist",
  {
    path: "cart",
    populate: [
      {
        path: "products",
        populate: [
          {
            path: "productId",
          },
        ],
      },
    ],
  },
];
