 import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import ExtendError from "../../errors/extended-error";
import config from "../../config";
import { handleZodError } from "../../errors/zod-error";
import { IGenericErrMessage } from "../../types/error";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "internal server error";
  let errorDetails: IGenericErrMessage[] = [];

    if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  } else if (err instanceof ExtendError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err?.message ? [{ field: "", message: err?.message }] : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorDetails = err?.message ? [{ field: "", message: err?.message }] : [];
  }
  
  // generic error format send for frontend;
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack: config.env !== "production" ? err?.stack : undefined,
  });
};