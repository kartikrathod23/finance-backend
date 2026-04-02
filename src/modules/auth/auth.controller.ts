import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import { RegisterInput, LoginInput } from "./auth.types";

//controller for register
export const register = async (req: Request, res: Response) => {
  try{
    const data = req.body as RegisterInput;

    const user = await registerUser(data);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any){
    res.status(400).json({
      message: error.message || "Registration failed",
    });
  }
};

//Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body as LoginInput;

    const result = await loginUser(data);

    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Login failed",
    });
  }
};