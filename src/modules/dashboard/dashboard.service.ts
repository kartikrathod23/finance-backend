import prisma from "../../prisma/client";
import { FinancialRecord } from "@prisma/client";

//get total income
export const getTotalIncome = async (userId: string) =>{
  const result = await prisma.financialRecord.aggregate({
    _sum: {amount: true},
    where:{
      userId,
      type: "INCOME",
      isDeleted: false,
    },
  });

  return result._sum.amount || 0;
};

//total expense
export const getTotalExpense = async (userId: string) =>{
  const result = await prisma.financialRecord.aggregate({
    _sum: {amount: true},
    where:{
      userId,
      type: "EXPENSE",
      isDeleted: false,
    },
  });

  return result._sum.amount || 0;
};

//net balance
export const getNetBalance = async (userId: string) =>{
  const income = await getTotalIncome(userId);
  const expense = await getTotalExpense(userId);

  return income - expense;
};

//category wise total bal
export const getCategoryTotals = async (userId: string) =>{
  return prisma.financialRecord.groupBy({
    by: ["category"],
    _sum:{amount: true},
    where:{
      userId,
      isDeleted: false,
    },
  });
};

//find recent activity
export const getRecentActivity = async (userId: string) =>{
  return prisma.financialRecord.findMany({
    where:{
      userId,
      isDeleted: false,
    },
    orderBy: {date: "desc"},
    take: 5,
  });
};

//monthly trends
export const getMonthlyTrends = async (userId: string) =>{
  const records: FinancialRecord[] = await prisma.financialRecord.findMany({
    where:{
        userId,
        isDeleted: false,
    },
});

  const result: Record<string, {income: number; expense: number}> = {};

  records.forEach((r)=>{
    const month = r.date.toISOString().slice(0, 7);//YYYY-MM

    if(!result[month]){
      result[month] = { income: 0, expense: 0 };
    }

    if(r.type === "INCOME"){
      result[month].income += r.amount;
    } else{
      result[month].expense += r.amount;
    }
  });

  return result;
};