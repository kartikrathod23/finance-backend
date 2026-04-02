import prisma from "../../prisma/client";
import { AppError } from "../../utils/AppError";
import { Role } from "@prisma/client";

//GET users
export const getAllUsers = async () =>{
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
};

//UPDATE usr role
export const updateUserRole = async (id: string, role: Role) =>{

  const validRoles = Object.values(Role);


  if(!validRoles.includes(role)){
    throw new AppError("Invalid role", 400);
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if(!user){
    throw new AppError("User not found", 404);
  }

  return prisma.user.update({
    where: { id },
    data: { role },
  });
};

//TOGGLE user status
export const toggleUserStatus = async (id: string, isActive: boolean) =>{

  if(typeof isActive !== "boolean"){
    throw new AppError("isActive must be boolean", 400);
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if(!user){
    throw new AppError("User not found", 404);
  }

  return prisma.user.update({
    where: { id },
    data: { isActive },
  });
};