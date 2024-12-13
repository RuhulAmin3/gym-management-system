import { StatusCodes } from "http-status-codes";
import AsyncHandler from "../../../common/async-handler";
import { sendResponse } from "../../../common/send-response";
import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = AsyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const accessToken = await authService.loginUser(data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "user login successful",
    data: accessToken,
  });
});

const registerTrainee = AsyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await authService.registerTrainee(data);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Trainee account created successfully",
    data: result,
  });
});

const addTrainer = AsyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await authService.addTrainer(data);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Trainer added successfully",
    data: result,
  });
});

const updatePassword = AsyncHandler(async (req: Request, res: Response) => {
  const {oldPassword, newPassword} = req.body;
  const {userId} = req.user || {};

  const result = await authService.updatePassword(userId, oldPassword, newPassword);
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "user password updated successfully",
    data: result,
  });
});

export const authController = {
  loginUser,
  registerTrainee,
  addTrainer,
  updatePassword,
};
