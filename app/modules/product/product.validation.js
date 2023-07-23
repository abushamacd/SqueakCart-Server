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
    tag: z.array(
      z.string({
        required_error: "Zod: Tag is required",
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
    brand: z.string({
      required_error: "Zod: brand is required",
    }),
    status: z.string({
      required_error: "Zod: Status is required",
    }),
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
    brand: z.string().optional(),
    status: z.string().optional(),
  }),
});

exports.ratingZod = z.object({
  body: z.object({
    star: z.number({
      required_error: "Zod: Rating star is required",
    }),
    productId: z.string({
      required_error: "Zod: Product is is required",
    }),
  }),
});
