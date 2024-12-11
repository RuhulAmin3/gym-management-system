
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { JwtDataType } from "../types/jwt";

const createToken = (
  data: JwtDataType,
  secret: Secret,
  expireTime: string
): string => {
  const token = jwt.sign(data, secret, { expiresIn: expireTime });
  return token;
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtUtils = {
  createToken,
  verifyToken,
};