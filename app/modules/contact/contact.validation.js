const { z } = require("zod");
const { status } = require("./contact.constant");

exports.createContactZod = z.object({
  body: z.object({
    name: z.string({
      required_error: "Zod: Name is required",
    }),
    email: z.string({
      required_error: "Zod: Email is required",
    }),
    message: z.string({
      required_error: "Zod: Comment is required",
    }),
  }),
});

exports.updateContactZod = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    message: z.string().optional(),
    status: z.enum([...status]).optional(),
  }),
});
