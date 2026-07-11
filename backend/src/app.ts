import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import flashcardRoutes from "./routes/flashcard.routes";

import cookieParser from "cookie-parser";

const app = express();

// makes it so the backend and the frontend can connect
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4173",
      process.env.FRONTEND_URL!,
    ],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

// auth routes
app.use("/auth", authRoutes);

// flashcard routes
app.use("/api", flashcardRoutes);

export default app;
