import prisma from "../../prisma/client";
import { CreateRecordInput, UpdateRecordInput, QueryParams } from "./finance.types";

//CREATE
export const createRecord = async (userId: string, data: CreateRecordInput) =>{
  return prisma.financialRecord.create({
    data:{
      ...data,
      date: new Date(data.date),
      userId,
    },
  });
};

//GET (with filtering + pagination)
export const getRecords = async (userId: string, query: QueryParams) =>{
  const { type, category, startDate, endDate, page = "1", limit = "10" } = query;

  const filters: any = {
    userId,
    isDeleted: false,
  };

  if(type) filters.type = type;
  if(category) filters.category = category;

  if(startDate || endDate){
    filters.date = {};
    if(startDate) filters.date.gte = new Date(startDate);
    if(endDate) filters.date.lte = new Date(endDate);
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const records = await prisma.financialRecord.findMany({
    where: filters,
    skip,
    take: parseInt(limit),
    orderBy: {date: "desc"},
  });

  return records;
};

// UPDATE
export const updateRecord = async (id: string, data: UpdateRecordInput) =>{
  return prisma.financialRecord.update({
    where: {id},
    data:{
      ...data,
      ...(data.date && { date: new Date(data.date)}),
    },
  });
};

//SOFT DELETE
export const deleteRecord = async (id: string) =>{
  return prisma.financialRecord.update({
    where: {id},
    data: {isDeleted: true},
  });
};