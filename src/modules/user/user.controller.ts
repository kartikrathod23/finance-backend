import { Request, Response } from "express";
import * as service from "./user.service";
import { validateRequired } from "../../utils/validate";
import { Role } from "@prisma/client";
import { successResponse } from "../../utils/response";
import { AppError } from "../../utils/AppError";

//GET users
export const getUsers = async (req: Request, res: Response) =>{
  try{
    const users = await service.getAllUsers();

    res.json(successResponse(users, "Users fetched"));
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//UPDATE role
export const updateRole = async (req: Request, res: Response) =>{
  try{
    const id = req.params.id as string;

    const {role} = req.body;
    validateRequired({role});

    if(!Object.values(Role).includes(role)){
      throw new AppError("Invalid role", 400);
    }

    const user = await service.updateUserRole(id, role);

    res.json(successResponse(user, "User role updated")); 
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//TOGGLE status
export const toggleStatus = async (req: Request, res: Response) =>{
  try{
    const id = req.params.id as string;

    const {isActive} = req.body;

    if(typeof isActive !== "boolean"){
      throw new AppError("isActive must be boolean", 400);
    }

    const user = await service.toggleUserStatus(id, isActive);

    res.json(successResponse(user, "User status updated"));
  } catch (error: any){
    res.status(400).json({ message: error.message });
  }
};