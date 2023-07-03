const { z } = require("zod");

exports.createBrandZod = z.object({
  body: z.object({
    title: z.string({
      required_error: "Zod: Title is required",
    }),
  }),
});

exports.updateBrandZod = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
