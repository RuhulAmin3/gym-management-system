import { z } from "zod";

const updateTrainerZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "name must be string",
      })
      .optional(),
    specialty: z
      .string({
        invalid_type_error: "specialty must be string",
      })
      .optional(),
  }),
});

export const trainerValidation = {
  updateTrainerZodSchema,
};
