import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import flashcards from "./routes/flashcards.routes";

import cookieParser from "cookie-parser";

const app = express();

// makes it so the backend and the frontend can connect
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

// auth routes
app.use("/auth", authRoutes);

// crud flashcards
app.use("/api", flashcards);

export default app;
