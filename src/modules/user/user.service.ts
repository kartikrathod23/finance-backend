import prisma from "../../prisma/client";

// GET Users
export const getAllUsers = async ()=>{
  return prisma.user.findMany({
    select:{
      id: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
};

// UPDATE user role
export const updateUserRole = async (id: string, role: any) =>{
  return prisma.user.update({
    where: {id},
    data: {role},
  });
};

// TOGGLE active
export const toggleUserStatus = async (id: string, isActive: boolean) =>{
  return prisma.user.update({
    where: {id},
    data: {isActive},
  });
};