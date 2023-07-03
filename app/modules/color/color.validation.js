const { z } = require("zod");

exports.createColorZod = z.object({
  body: z.object({
    title: z.string({
      required_error: "Zod: Title is required",
    }),
    code: z.string({
      required_error: "Zod: Code is required",
    }),
  }),
});

exports.updateColorZod = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.string().optional(),
  }),
});
