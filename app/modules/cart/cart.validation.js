const { z } = require("zod");

exports.createCartZod = z.object({
  body: z.object({
    productId: z.string({
      required_error: "Zod: Product id is required",
    }),
    count: z.number({
      required_error: "Zod: Count id is required",
    }),
    color: z.string({
      required_error: "Zod: Color id is required",
    }),
    price: z.number({
      required_error: "Zod: price id is required",
    }),
  }),
});

exports.removeFromCartZod = z.object({
  body: z.object({
    color: z.string({
      required_error: "Zod: Color is required",
    }),
  }),
});
