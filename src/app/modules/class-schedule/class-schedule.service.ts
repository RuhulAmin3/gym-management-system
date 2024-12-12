import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/prisma-client";
import ExtendError from "../../../errors/extended-error";
import { StatusCodes } from "http-status-codes";
import { IOptions } from "../../../types/pagination";
import {
  calculatePagination,
  PaginationMetaData,
} from "../../../utils/pagination";

const existClassSchedule = async (
  data: Prisma.ClassScheduleCreateInput
): Promise<boolean> => {
  const res = await prisma.classSchedule.findFirst({
    where: {
      AND: [
        // Check for the same date
        {
          classDate: {
            equals: new Date(data.classDate),
          },
        },
        // Check for time overlap using OR conditions
        {
          OR: [
            // Case 1: New start time falls within an existing schedule
            {
              AND: [
                { startTime: { lte: data.startTime } },
                { endTime: { gt: data.startTime } },
              ],
            },
            // Case 2: New end time falls within an existing schedule
            {
              AND: [
                { startTime: { lt: data.endTime } },
                { endTime: { gte: data.endTime } },
              ],
            },
            // Case 3: New schedule completely encompasses an existing schedule
            {
              AND: [
                { startTime: { gte: data.startTime } },
                { endTime: { lte: data.endTime } },
              ],
            },
          ],
        },
      ],
    },
  });

  return !!res;
};

const createclassSchedule = async (data: Prisma.ClassScheduleCreateInput) => {
  const isExistClassSchedule = await existClassSchedule(data);

  const checkMaximum = await prisma.classSchedule.count({
    where: {
      classDate: data.classDate,
    },
  });

  if (checkMaximum >= 5)
    throw new ExtendError(
      StatusCodes.BAD_REQUEST,
      `cannot create more class schedule for the ${data.classDate}`
    );

  if (isExistClassSchedule)
    throw new ExtendError(
      StatusCodes.CONFLICT,
      "Class schedule overlaps with an existing schedule."
    );

  const result = await prisma.classSchedule.create({
    data,
  });

  return result;
};

const getAllClassSchedule = async (
  date: string,
  paginationOptions: IOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const classDate = date
    ? new Date(date).toISOString()
    : new Date().toISOString();

  const result = await prisma.classSchedule.findMany({
    where: {
      classDate: classDate,
    },
    skip: skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalDoc = await prisma.classSchedule.count({ where: { classDate } });

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

const getClassSchedule = async (id: string) => {
  const result = await prisma.classSchedule.findUnique({
    where: {
      id: id,
    },
  });
  if (!result)
    throw new ExtendError(StatusCodes.NOT_FOUND, "class schedule not found");
  return result;
};

const updateClassSchedule = async (
  id: string,
  data: Prisma.ClassScheduleCreateInput
) => {
  const result = await prisma.classSchedule.findUnique({
    where: {
      id: id,
    },
  });
  if (!result)
    throw new ExtendError(StatusCodes.NOT_FOUND, "class schedule not found");

  const isExistClassSchedule = await existClassSchedule(data);

  if (isExistClassSchedule)
    throw new ExtendError(
      StatusCodes.CONFLICT,
      "Class schedule overlaps with an existing schedule."
    );

  const updatedResult = await prisma.classSchedule.update({
    where: {
      id,
    },
    data,
  });

  return updatedResult;
};

const assignTrainerIntoClassSchedule = async (
  id: string,
  trainerId: string
) => {
  const isExist = await prisma.classSchedule.findUnique({ where: { id } });
  if (!isExist)
    throw new ExtendError(StatusCodes.NOT_FOUND, "class schedule not found");

  const assignTrainer = await prisma.classSchedule.update({
    where: {
      id: id,
    },
    data: {
      trainerId,
    },
  });

  return assignTrainer;
};

const deleteClassSchedule = async (id: string) => {
  const isExist = await prisma.classSchedule.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExist)
    throw new ExtendError(StatusCodes.NOT_FOUND, "class schedule not found");

  await prisma.classSchedule.delete({
    where: {
      id,
    },
  });

  return "class schedule deleted successfully";
};

export const classScheduleService = {
  createclassSchedule,
  getAllClassSchedule,
  getClassSchedule,
  updateClassSchedule,
  deleteClassSchedule,
  assignTrainerIntoClassSchedule,
};
