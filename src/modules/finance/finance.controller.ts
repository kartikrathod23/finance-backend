import { Response } from "express";
import { AuthRequest } from "../../types/express";
import * as service from "./finance.service";
import { validateRequired } from "../../utils/validate";

//CREATE record
export const create = async (req: AuthRequest, res: Response) =>{
  try{
    const { amount, type, category, date } = req.body;
    validateRequired({ amount, type, category, date });

    const record = await service.createRecord(req.user!.userId, req.body);
    res.status(201).json(record);
  }catch (error: any){
    res.status(400).json({ message: error.message });
  }
};

//GET recod
export const getAll = async (req: AuthRequest, res: Response) =>{
  try{
    const records = await service.getRecords(req.user!.userId, req.query);
    res.json(records);
  }catch (error: any){
    res.status(400).json({ message: error.message });
  }
};

//UPDATE record
export const update = async (req: AuthRequest, res: Response) =>{
  try{
    if(!req.body || Object.keys(req.body).length === 0){
        throw new Error("At least one field is required to update");
    }
    
    const id = req.params.id as string;
    const record = await service.updateRecord(id, req.body);
    res.json(record);
  }catch (error: any){
    res.status(400).json({ message: error.message });
  }
};

//DELETE record
export const remove = async (req: AuthRequest, res: Response) =>{
  try{
    const id = req.params.id as string;
    await service.deleteRecord(id);
    res.json({ message: "Record deleted" });
  }catch (error: any){
    res.status(400).json({ message: error.message });
  }
};