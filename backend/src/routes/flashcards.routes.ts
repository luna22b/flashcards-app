import { Request, Response, Router } from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import { createFlashcard } from "../services/flashcard.service";

const router = Router();

router.post(
  "/flashcards",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const newFlashcard = await createFlashcard(req.body, req.user);
      return res.status(200).json({
        status: "success",
        data: newFlashcard,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Couldn't create flashcard. Please try again." });
    }
  },
);

export default router;
