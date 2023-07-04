const { z } = require("zod");
const { status } = require("./address.constant");

exports.createAddressZod = z.object({
  body: z.object({
    addressline1: z.string({
      required_error: "Zod: Address line 1 is required",
    }),
    addressline2: z.string().optional(),
    zipCode: z.string({
      required_error: "Zod: Zip code is required",
    }),
    city: z.string({
      required_error: "Zod: City is required",
    }),
    state: z.string({
      required_error: "Zod: State is required",
    }),
    country: z.string({
      required_error: "Zod: Country is required",
    }),
  }),
});

exports.updateAddressZod = z.object({
  body: z.object({
    addressline1: z.string().optional(),
    addressline2: z.string().optional(),
    zipCode: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  }),
});
