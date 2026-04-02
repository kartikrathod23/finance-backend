import {Response } from "express";
import { AuthRequest } from "../../types/express";
import * as service from "./dashboard.service";

export const summary = async (req: AuthRequest, res: Response) =>{
  try{
    const userId = req.user!.userId;

    const totalIncome = await service.getTotalIncome(userId);
    const totalExpense = await service.getTotalExpense(userId);
    const netBalance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
    });
  } catch (error: any){
    res.status(400).json({message: error.message});
  }
};

export const categoryTotals = async (req: AuthRequest, res: Response) =>{
  try{
    const data = await service.getCategoryTotals(req.user!.userId);
    res.json(data);
  } catch (error: any) {
    res.status(400).json({message: error.message});
  }
};

export const recent = async (req: AuthRequest, res: Response) =>{
  try{
    const data = await service.getRecentActivity(req.user!.userId);
    res.json(data);
  } catch (error: any) {
    res.status(400).json({message: error.message});
  }
};

export const trends = async (req: AuthRequest, res: Response) =>{
  try{
    const data = await service.getMonthlyTrends(req.user!.userId);
    res.json(data);
  } catch (error: any) {
    res.status(400).json({message: error.message});
  }
};