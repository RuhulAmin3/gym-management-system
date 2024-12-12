import { Request, Response } from "express";
import AsyncHandler from "../../../common/async-handler";
import { queryPick } from "../../../utils/query-pick";
import { paginationFields } from "../../../common/constants";
import { trainerService } from "./trainer.service";
import { sendResponse } from "../../../common/send-response";
import { StatusCodes } from "http-status-codes";


const getAllTrainer = AsyncHandler(
    async (req: Request, res: Response) => {
      const paginationOptions = queryPick(req.query, paginationFields); 
      const {data, meta} = await trainerService.getAllTrainer(paginationOptions);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "all trainer retrived successfully",
        data: data,
        meta,
      });
    }
  );
  
  const getTrainer = AsyncHandler(
    async (req: Request, res: Response) => {
      const {id} = req.params; 
      const result = await trainerService.getTrainer(id);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "trainer retrieved successfully",
        data:result
      });
    }
  );
  
  const updateTrainer = AsyncHandler(
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const updatedData = req.body;
      const result = await trainerService.updateTrainer(id, updatedData);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "trainer updated successfully",
        data: result,
      });
    }
  );

  const deleteTrainer = AsyncHandler(
    async (req: Request, res: Response) => {
      const {id} = req.params; 
      await trainerService.deleteTrainer(id);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "trainer deleted successfully",
      });
    }
  );
  
export const trainerController = {
    getTrainer,
    getAllTrainer,
    deleteTrainer,
    updateTrainer, 
  };
  