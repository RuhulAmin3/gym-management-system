import { Request, Response } from "express";
import AsyncHandler from "../../../common/async-handler";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../common/send-response";
import { classScheduleService } from "./class-schedule.service";
import { paginationFields } from "../../../common/constants";
import { queryPick } from "../../../utils/query-pick";

const createClassSchedule = AsyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await classScheduleService.createclassSchedule(data);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "class schedule created successfully",
      data: result,
    });
  }
);

const getAllClassSchedule = AsyncHandler(
  async (req: Request, res: Response) => {
    const paginationOptions = queryPick(req.query, paginationFields);

    const {date} = queryPick(req.query, ["date"]) || {};

    const {data, meta} = await classScheduleService.getAllClassSchedule(date as string, paginationOptions);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "all class schedule retrived successfully",
      data: data,
      meta,
    });
  }
);

const getClassSchedule = AsyncHandler(
  async (req: Request, res: Response) => {
    const {id} = req.params; 
    const result = await classScheduleService.getClassSchedule(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "class schedule retrieved successfully",
      data:result
    });
  }
);

const updateClassSchedule = AsyncHandler(
  async (req: Request, res: Response) => {
    const {id} = req.params;
    const updatedData = req.body;
    const result = await classScheduleService.updateClassSchedule(id, updatedData);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "class schedule updated successfully",
      data: result,
    });
  }
);

const assignTrainerIntoClassSchedule = AsyncHandler(
  async (req: Request, res: Response) => {
    const {id} = req.params;
    const {trainerId} = req.body;
    const result = await classScheduleService.assignTrainerIntoClassSchedule(id, trainerId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "trainer assign successfully in the class schedule",
      data: result,
    });
  }
);

const deleteClassSchedule = AsyncHandler(
  async (req: Request, res: Response) => {
    const {id} = req.params; 
    await classScheduleService.deleteClassSchedule(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "class schedule deleted successfully",
    });
  }
);


export const classSchduleController = {
  createClassSchedule,
  getAllClassSchedule,
  updateClassSchedule,
  deleteClassSchedule,
  getClassSchedule,
  assignTrainerIntoClassSchedule
};
