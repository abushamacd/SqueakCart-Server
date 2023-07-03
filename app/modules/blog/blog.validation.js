const { z } = require("zod");

exports.createBlogZod = z.object({
  body: z.object({
    title: z.string({
      required_error: "Zod: Title is required",
    }),
    description: z.string({
      required_error: "Zod: Description is required",
    }),
    visibility: z.string({
      required_error: "Zod: Visibility is required",
    }),
    date: z.string({
      required_error: "Zod: Date is required",
    }),
    // z.array(z.string())
    category: z.array(
      z.string({
        required_error: "Zod: Category is required",
      })
    ),
    author: z.string({
      required_error: "Zod: Author is required",
    }),
  }),
});

exports.updateBlogZod = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    visibility: z.string().optional(),
    date: z.string().optional(),
    category: z.string().optional().array().optional(),
    author: z.string().optional(),
  }),
});
