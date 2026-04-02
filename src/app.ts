import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import financeRoutes from "./modules/finance/finance.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes"
import userRoutes from "./modules/user/user.routes";
import { errorHandler } from "./middleware/error.middleware";
import rateLimit from "express-rate-limit";

const app = express();

app.use(cors());
app.use(express.json());

//rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,//15 minutes
  max: 100, //limiting each IP to 100 requests
  message: "Too many requests, please try again later",
});

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users",userRoutes);

app.use(errorHandler);

export default app;