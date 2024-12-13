import { NextFunction, Request, Response } from "express"; 
import ExtendError from "../../errors/extended-error";
import { jwtUtils } from "../../utils/jwt-helpers";
import {StatusCodes} from "http-status-codes";
import config from "../../config";
import { Role } from "@prisma/client";

export const authenticate =
  (...roles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new ExtendError(
            StatusCodes.UNAUTHORIZED,
          "Unauthorized access"
        );
      }
      const varifiedUser = jwtUtils.verifyToken(
        token,
        config.jwt.access_secret as string
      );

      req.user = varifiedUser;

      if (roles.length && !roles.includes(varifiedUser.role)) {
        throw new ExtendError(StatusCodes.FORBIDDEN, "you are forbidden user");
      }
      next();
    } catch (err) {
      next(err);
    }
  };