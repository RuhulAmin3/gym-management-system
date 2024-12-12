import { z } from "zod";

export const createClassScheduleZodSchema = z.object({
  body: z
    .object({
      classDate: z
        .string({ required_error: "Class date is required" })
        .refine(
          (dateString) => {
            const parsedDate = new Date(dateString);
            return !isNaN(parsedDate.getTime());
          },
          { message: "Invalid date format" }
        )
        .transform((str) => new Date(str)),

      startTime: z
        .string({ required_error: "Start time is required" })
        .refine(
          (timeString) => {
            const parsedTime = new Date(`1970-01-01T${timeString}`);
            return !isNaN(parsedTime.getTime());
          },
          { message: "Invalid time format. Use HH:MM format" }
        )
        .transform((timeString) => {
          const [hours, minutes] = timeString.split(":").map(Number);
          const time = new Date();
          time.setHours(hours, minutes, 0, 0);
          return time;
        }),

      endTime: z
        .string({ required_error: "End time is required" })
        .refine(
          (timeString) => {
            const parsedTime = new Date(`1970-01-01T${timeString}`);
            return !isNaN(parsedTime.getTime());
          },
          { message: "Invalid time format. Use HH:MM format" }
        )
        .transform((timeString) => {
          const [hours, minutes] = timeString.split(":").map(Number);
          const time = new Date();
          time.setHours(hours, minutes, 0, 0);
          return time;
        }),

      trainerId: z
        .string({
          invalid_type_error: "Trainer ID must be a string",
        })
        .optional(),
    })
    .refine(
      (data) => {
        return data.endTime > data.startTime;
      },
      {
        message: "End time must be later than start time",
        path: ["endTime"],
      }
    ),
});

export const ClassScheduleValidation = {
  createClassScheduleZodSchema,
};

