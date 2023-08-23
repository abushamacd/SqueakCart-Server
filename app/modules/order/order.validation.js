const { z } = require("zod");
const { status } = require("./order.constant");

exports.createOrderZod = z.object({
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

exports.updateOrderZod = z.object({
  body: z.object({
    color: z.string({
      required_error: "Zod: Color is required",
    }),
  }),
});

exports.handleQuantityOrderZod = z.object({
  body: z.object({
    color: z.string({
      required_error: "Zod: Color is required",
    }),
    status: z.enum([...status], {
      required_error: "Zod: Status is required",
    }),
  }),
});
