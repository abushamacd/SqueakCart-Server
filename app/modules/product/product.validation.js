const { z } = require("zod");

exports.createProductZod = z.object({
  body: z.object({
    title: z.string({
      required_error: "Zod: Title is required",
    }),
    description: z.string({
      required_error: "Zod: Description is required",
    }),
    price: z.number({
      required_error: "Zod: price is required",
    }),
    category: z.array(
      z.string({
        required_error: "Zod: Category is required",
      })
    ),
    quantity: z.number({
      required_error: "Zod: price is required",
    }),
    color: z.array(
      z.string({
        required_error: "Zod: color is required",
      })
    ),
    brand: z.array(
      z.string({
        required_error: "Zod: brand is required",
      })
    ),
  }),
});

exports.updateProductZod = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional().array().optional(),
    quantity: z.number().optional(),
    color: z.string().optional().array().optional(),
    brand: z.string().optional().array().optional(),
  }),
});
