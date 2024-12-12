import { Request, Response } from "express";
import AsyncHandler from "../../../common/async-handler";
import { queryPick } from "../../../utils/query-pick";
import { paginationFields } from "../../../common/constants";
import { sendResponse } from "../../../common/send-response";
import { StatusCodes } from "http-status-codes";
import { traineeService } from "./trainee.service";


const addBooking = AsyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await traineeService.addBooking(data);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "class schedule booking successfully",
      data: result,
    });
  }
);

const getAllTrainee = AsyncHandler(
    async (req: Request, res: Response) => {
      const paginationOptions = queryPick(req.query, paginationFields); 
      const {data, meta} = await traineeService.getAllTrainee(paginationOptions);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "all trainee retrived successfully",
        data: data,
        meta,
      });
    }
  );
  
  const getTrainee = AsyncHandler(
    async (req: Request, res: Response) => {
      const {id} = req.params; 
      const result = await traineeService.getTrainee(id);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "trainee retrieved successfully",
        data:result
      });
    }
  );
  
  const updateTrainee = AsyncHandler(
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const updatedData = req.body;
      const result = await traineeService.updateTrainee(id, updatedData);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "trainee updated successfully",
        data: result,
      });
    }
  );

  const deleteTrainee = AsyncHandler(
    async (req: Request, res: Response) => {
      const {id} = req.params; 
      await traineeService.deleteTrainee(id);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "trainee deleted successfully",
      });
    }
  );
  
export const traineeController = {
    getAllTrainee, 
    getTrainee,
    updateTrainee,
    deleteTrainee,
    addBooking,
  };
  