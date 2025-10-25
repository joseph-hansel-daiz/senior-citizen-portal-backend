// app.ts
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { sequelize } from "@/models";

// Routes
import authRoutes from "@/routes/auth.routes";
import userRoutes from "@/routes/users.routes";
import optionsRoutes from "@/routes/options.routes";
import seniorRoutes from "@/routes/seniors.routes";
import helpdeskRoutes from "@/routes/helpdesk.routes";
import seniorVaccineRoutes from "@/routes/senior-vaccines.routes";
import { requireAuthentication } from "./middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Parse JSON and x-www-form-urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/auth", authRoutes);
app.use("/users", requireAuthentication,userRoutes);
app.use("/options", requireAuthentication,optionsRoutes);
app.use("/seniors", requireAuthentication,seniorRoutes);
app.use("/helpdesk", requireAuthentication,helpdeskRoutes);
app.use("/senior-vaccines", requireAuthentication,seniorVaccineRoutes);

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync({ alter: true }); // dev mode only
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Unable to start server:", err);
    process.exit(1);
  }
})();

export default app;
