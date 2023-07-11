const { z } = require("zod");
const { status } = require("./cart.constant");

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

exports.updateCartZod = z.object({
  body: z.object({
    color: z.string({
      required_error: "Zod: Color is required",
    }),
  }),
});

exports.handleQuantityCartZod = z.object({
  body: z.object({
    color: z.string({
      required_error: "Zod: Color is required",
    }),
    status: z.enum([...status], {
      required_error: "Zod: Status is required",
    }),
  }),
});
