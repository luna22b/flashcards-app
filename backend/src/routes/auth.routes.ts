import { Request, Response, Router } from "express";
import { Signup } from "../services/auth.service";
import { Login } from "../services/auth.service";
import { Me } from "../services/auth.service";
import { generateToken } from "../utils/generateToken";
import { authenticateUser } from "../middleware/authenticateUser";

const router = Router();

// register route
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const user = await Signup.signup(req.body);
    const token = generateToken(user.id);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

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
    const token = generateToken(user.id);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

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

router.get("/me", authenticateUser, async (req: Request, res: Response) => {
  try {
    const user = await Me.get(req.body!);

    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "User not found" });
  }
});

export default router;
