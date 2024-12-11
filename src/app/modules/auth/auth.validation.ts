import { z } from "zod";

const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "Invalid email format." }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const registerTraineeZodSchema = z.object({
  body: z.object({
    name:z.string({
        required_error:"name is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "Invalid email format." }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  registerTraineeZodSchema
};
