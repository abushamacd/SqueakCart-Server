const { z } = require("zod");

exports.createUserZod = z.object({
  body: z.object({
    firstname: z.string({
      required_error: "Zod: First name is required",
    }),
    lastname: z.string({
      required_error: "Zod: Last name is required",
    }),
    email: z.string({
      required_error: "Zod: Email is required",
    }),
    phone: z.string({
      required_error: "Zod: Phone number is required",
    }),
    password: z.string({
      required_error: "Zod: Password is required",
    }),
  }),
});

exports.updateUserZod = z.object({
  body: z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
  }),
});
