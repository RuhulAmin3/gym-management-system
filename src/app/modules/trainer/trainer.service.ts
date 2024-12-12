import { StatusCodes } from "http-status-codes";
import ExtendError from "../../../errors/extended-error";
import { IOptions } from "../../../types/pagination";
import {
  calculatePagination,
  PaginationMetaData,
} from "../../../utils/pagination";
import { prisma } from "../../../utils/prisma-client";
import { Prisma } from "@prisma/client";

const getAllTrainer = async (paginationOptions: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const result = await prisma.trainer.findMany({
    skip: skip,
    take: limit,
    include: {
      classes: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalDoc = await prisma.trainer.count();

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

const getTrainer = async (id: string) => {
  const result = await prisma.trainer.findUnique({
    where: {
      id: id,
    },
    include: {
      classes: true,
    },
  });

  if (!result)
    throw new ExtendError(StatusCodes.NOT_FOUND, "trainer not found");
  return result;
};

const deleteTrainer = async (id: string) => {
  const isExist = await prisma.trainer.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExist)
    throw new ExtendError(StatusCodes.NOT_FOUND, "trainer not found");

  await prisma.trainer.delete({ where: { id } });
};

const updateTrainer = async (id: string, data: Prisma.TrainerUpdateInput) => {
  const isExist = await prisma.trainer.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExist)
    throw new ExtendError(StatusCodes.NOT_FOUND, "trainer not found");

  const udpatedTrainer = await prisma.trainer.update({
    where: { id },
    data: data,
  });

  return udpatedTrainer;
};

export const trainerService = {
  getAllTrainer,
  getTrainer,
  deleteTrainer,
  updateTrainer,
};
