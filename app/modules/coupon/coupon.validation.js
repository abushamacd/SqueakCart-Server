const { z } = require("zod");

exports.createCouponZod = z.object({
  body: z.object({
    title: z.string({
      required_error: "Zod: Title is required",
    }),
    date: z.string({
      required_error: "Zod: Date is required",
    }),
    discount: z.number({
      required_error: "Zod: Discount is required",
    }),
  }),
});

exports.updateCouponZod = z.object({
  body: z.object({
    title: z.string().optional(),
    date: z.string().optional(),
    discount: z.number().optional(),
  }),
});
