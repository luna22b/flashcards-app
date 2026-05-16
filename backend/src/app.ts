import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

// makes it so the backend and the frontend can connect
app.use(cors());

app.use(express.json());

// auth routes
app.use("/auth", authRoutes);

export default app;
