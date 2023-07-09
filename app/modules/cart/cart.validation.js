const { z } = require("zod");

exports.createCartZod = z.object({
  body: z.object({
    products: z.array(
      z.object({
        product: z.string({
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
      })
    ),
    orderby: z.string({
      required_error: "Zod: User id is required",
    }),
  }),
});

exports.updateCartZod = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
