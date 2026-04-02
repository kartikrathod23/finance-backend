import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import financeRoutes from "./modules/finance/finance.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes"
import userRoutes from "./modules/user/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users",userRoutes);

export default app;