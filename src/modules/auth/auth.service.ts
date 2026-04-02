import prisma from "../../prisma/client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterInput, LoginInput } from "./auth.types";


const JWT_SECRET = process.env.JWT_SECRET as string;

//to register
export const registerUser = async (data: RegisterInput) =>{
  const { email, password, role } = data;

  //to check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if(existingUser){
    throw new Error("User already exists");
  }

  //password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  //create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });

  return user;
};

//Login service
export const loginUser = async (data: LoginInput) =>{
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if(!user){
    throw new Error("User not found");
  }

  if(!user.isActive){
    throw new Error("User is inactive");
  }

  //verify password
  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    throw new Error("Invalid credentials");
  }

  //token generation
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};