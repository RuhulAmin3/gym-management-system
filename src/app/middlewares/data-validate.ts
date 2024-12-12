import { AnyZodObject, ZodEffects } from "zod";
import { NextFunction, Request, Response } from "express";

export const dataValidationRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      
      req.body = parsedData.body;

      return next();
    } catch (error) {
      next(error);
    }
  };