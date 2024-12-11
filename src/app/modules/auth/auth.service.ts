import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import config from "../../../config";
import ExtendError from "../../../errors/extended-error";
import { prisma } from "../../../utils/prisma-client";
import { jwtUtils } from "../../../utils/jwt-helpers";
import { Secret } from "jsonwebtoken";
import { Prisma, Role } from "@prisma/client";
import { hashPassword } from "../../../utils/hash-password";

const loginUser = async (loginData: {
  email: string;
  password: string;
}): Promise<{ accessToken: string }> => {
  const user = await prisma.user.findUnique({
    where: {
      email: loginData.email,
    },
  });

  if (!user) {
    throw new ExtendError(StatusCodes.NOT_FOUND, "user does not exist");
  }

  const isPasswordMatched = bcrypt.compare(loginData.password, user.password);

  if (!isPasswordMatched) {
    throw new ExtendError(StatusCodes.UNAUTHORIZED, "wrong credientials");
  }

  const tokenData = { userId: user.id, role: user.role };

  const accessToken = jwtUtils.createToken(
    tokenData,
    config.jwt.access_secret as Secret,
    config.jwt.access_expire_time as string
  );

  return {
    accessToken,
  };
};

const registerTrainee = async (
  registerData: Prisma.TraineeCreateInput & Prisma.UserCreateInput
) => {

  const isExist = await prisma.user.findUnique({
    where: {
      email: registerData.email,
    },
  });
 
  if (isExist) {
    throw new ExtendError(StatusCodes.CONFLICT, "Trainee user already exists");
  }

  const userData = {
    email: registerData.email,
    password: hashPassword(registerData.password),
    role: Role.Trainee,
  };
  
  const res = await prisma.$transaction(async (tsx) => {
    const user = await tsx.user.create({
      data: userData,
    });

    const traineeData = {
      name: registerData.name,
      userId: user.id,
    };

    const trainee = await tsx.trainee.create({
      data: traineeData,
    });

    return trainee;
  });

  if(!res) throw new ExtendError(StatusCodes.BAD_REQUEST, "failed to create trainee account");

  return res;

};

export const authService = {
  loginUser,
  registerTrainee
};
