import express from "express";
import userRoutes from "./modules/users/user.routes";
import companyRoutes from "./modules/companies/company.routes";
import internshipRoutes from "./modules/internships/internship.routes";


const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/companies", companyRoutes);

app.use("/api/internships", internshipRoutes);

export default app;