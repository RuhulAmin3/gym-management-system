import { z } from "zod";

const addBookingZodSchema = z.object({
  body: z.object({
    classScheduleId: z.string({
      required_error: "classScheduleId is required",
    }),
    traineeId: z.string({
      required_error: "traineeId is required",
    }),
  }),
});

const updateTraineeZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "name must be string",
      })
      .optional(),
  }),
});

export const traineeValidation = {
  updateTraineeZodSchema,
  addBookingZodSchema
};
