import { Request, Response } from "express";
import * as service from "./user.service";

//GET users
export const getUsers = async (req: Request, res: Response) =>{
  try{
    const users = await service.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(400).json({message: error.message});
  }
};

//UPDATE role
export const updateRole = async (req: Request, res: Response) =>{
  try{
    const id = req.params.id as string;
    const {role} = req.body;

    const user = await service.updateUserRole(id, role);
    res.json(user);
  } catch (error: any){
    res.status(400).json({message: error.message});
  }
};

//TOGGLE status
export const toggleStatus = async (req: Request, res: Response) =>{
  try{
    const id = req.params.id as string;
    const {isActive} = req.body;

    const user = await service.toggleUserStatus(id, isActive);
    res.json(user);
  } catch (error: any){
    res.status(400).json({message: error.message});
  }
};