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
    name: z.string({
      required_error: "name is required",
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

const addTrainerZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    specialty: z.string({
      required_error: "specialty is required",
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

const updatePaswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "oldPassword is required",
    }),
    newPassword: z.string({
      required_error: "newPassword is required",
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  registerTraineeZodSchema,
  addTrainerZodSchema,
  updatePaswordZodSchema
};
