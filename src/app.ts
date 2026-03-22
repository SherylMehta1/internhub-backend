import express from "express";
import userRoutes from "./modules/users/user.routes";
import companyRoutes from "./modules/companies/company.routes";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/companies", companyRoutes);

export default app;