import { Request, Response, Router } from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import { NewFlashcardSet } from "../services/flashcard.service";

const router = Router();

router.post(
  "/flashcards",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const set = await NewFlashcardSet.newSet({
        ...req.body,
        userId: req.user!.id,
      });

      res.json(set);
    } catch (err) {
      res.status(400).json({ message: "Failed to create set" });
    }
  },
);

export default router;
