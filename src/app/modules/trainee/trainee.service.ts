import { StatusCodes } from "http-status-codes";
import ExtendError from "../../../errors/extended-error";
import { IOptions } from "../../../types/pagination";
import {
  calculatePagination,
  PaginationMetaData,
} from "../../../utils/pagination";
import { prisma } from "../../../utils/prisma-client";
import { Prisma } from "@prisma/client";


const addBooking = async (data: {
  classScheduleId: string;
  traineeId: string;
}) => {
  const { trainees } =
    (await prisma.classSchedule.findUnique({
      where: { id: data.classScheduleId },
      select: {
        trainees: true,
      },
    })) || {};

    // check availability
  if (trainees != null && trainees >= 5) {
    throw new ExtendError(
      StatusCodes.BAD_REQUEST,
      "The class schedule is full!"
    );
  }
 const result = await prisma.$transaction(async (tsx) => {
    const res = await tsx.booking.create({
      data,
    });

    await tsx.classSchedule.update({
      where: {
        id: data.classScheduleId,
      },
      data: {
        trainees: {
          increment: 1,
        },
      },
    });

    return res;
  });

  return result;

};

const getAllTrainee = async (paginationOptions: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const result = await prisma.trainee.findMany({
    skip: skip,
    take: limit,
    include: {
      bookings: {
        include: {
          classSchedule: true,
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalDoc = await prisma.trainee.count();

  const { totalPages, prevPage, nextPage } = PaginationMetaData(
    page,
    totalDoc,
    limit
  );

  const meta = {
    limit: limit,
    total: totalDoc,
    page: page,
    totalPages,
    prevPage,
    nextPage,
  };

  return { data: result, meta };
};

const getTrainee = async (id: string) => {
  const result = await prisma.trainee.findUnique({
    where: {
      id: id,
    },
   include:{
      bookings:{
        include:{
          classSchedule:true
        }
      }
   }
  });

  if (!result)
    throw new ExtendError(StatusCodes.NOT_FOUND, "trainee not found");
  return result;
};

const deleteTrainee = async (id: string) => {
  const isExist = await prisma.trainee.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExist)
    throw new ExtendError(StatusCodes.NOT_FOUND, "trainee not found");

  await prisma.trainee.delete({ where: { id } });
};

const updateTrainee = async (id: string, data: Prisma.TraineeUpdateInput) => {
  const isExist = await prisma.trainee.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExist)
    throw new ExtendError(StatusCodes.NOT_FOUND, "trainee not found");

  const updatedTrainee = await prisma.trainee.update({
    where: { id },
    data: data,
  });

  return updatedTrainee;
};

export const traineeService = {
 getAllTrainee, 
 getTrainee,
 updateTrainee, 
 deleteTrainee,
 addBooking,
};
