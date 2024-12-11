
import { NextFunction, Request, RequestHandler, Response } from "express";

const AsyncHandler = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default AsyncHandler;