const { z } = require("zod");

exports.loginUserZod = z.object({
  body: z.object({
    email: z.string({
      required_error: "Zod: Email is required",
    }),
    password: z.string({
      required_error: "Zod: Password is required",
    }),
  }),
});

exports.refreshTokenZod = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Zod: Refresh Token is required",
    }),
  }),
});

exports.changePasswordZod = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Zod: Old password is required",
    }),
    newPassword: z.string({
      required_error: "Zod: New password is required",
    }),
  }),
});

exports.forgetPasswordZod = z.object({
  body: z.object({
    email: z.string({
      required_error: "Zod: Email is required",
    }),
  }),
});

exports.resetPasswordZod = z.object({
  body: z.object({
    password: z.string({
      required_error: "Zod: Password is required",
    }),
  }),
});
