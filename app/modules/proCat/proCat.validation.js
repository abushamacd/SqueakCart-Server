const { z } = require("zod");

exports.createProCatZod = z.object({
  body: z.object({
    title: z.string({
      required_error: "Zod: Title is required",
    }),
  }),
});

exports.updateProCatZod = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
