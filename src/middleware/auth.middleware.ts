import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) =>{
  try {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as any;

    req.user={
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error){
    res.status(401).json({ message: "Invalid token" });
  }
};