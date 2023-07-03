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
    mobile: z.string({
      required_error: "Zod: Mobile is required",
    }),
    comment: z.string({
      required_error: "Zod: Comment is required",
    }),
    status: z.enum([...status], {
      required_error: "Zod: Status is required",
    }),
  }),
});

exports.updateContactZod = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    mobile: z.string().optional(),
    comment: z.string().optional(),
    status: z.enum([...status]).optional(),
  }),
});
