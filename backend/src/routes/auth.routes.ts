import { Request, Response, Router } from "express";
import { Signup } from "../services/auth.service";
import { Login } from "../services/auth.service";

const router = Router();

// register route
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const user = await Signup.signup(req.body);
    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Email or username already exists. Please try again.",
    });
  }
});

// login route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await Login.login(req.body);
    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Email or username already exists. Please try again.",
    });
  }
});

export default router;
