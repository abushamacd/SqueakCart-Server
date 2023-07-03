const { z } = require("zod");

exports.createBlogCatZod = z.object({
  body: z.object({
    title: z.string({
      required_error: "Zod: Title is required",
    }),
  }),
});

exports.updateBlogCatZod = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
