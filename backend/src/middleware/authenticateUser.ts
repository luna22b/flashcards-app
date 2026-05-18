import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// checks if token is valid, next function if it is
export const authenticateUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // see types.d.ts - very important for this to work (future)
    req.user = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
