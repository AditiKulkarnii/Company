const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const companyRoutes = require("./Routes/CompanyRoutes");
const employeeRoutes = require("./Routes/EmployeeRoutes");
const dashboardRoutes = require("./Routes/DashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Failed:", err));

// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
