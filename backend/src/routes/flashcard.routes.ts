import { Request, Response, Router } from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import { NewFlashcardSet } from "../services/flashcard.service";
import { getFlashcardSets } from "../services/flashcard.service";
import { userCards } from "../services/flashcard.service";

const router = Router();

router.post(
  "/flashcards",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const set = await NewFlashcardSet.newSet({
        ...req.body,
        userId: req.user!,
      });

      console.log(set);

      res.json(set);
    } catch (err) {
      console.error(err);
      res.status(400).json({
        message: "Failed to create set",
        error: err,
      });
    }
  },
);

router.get(
  "/flashcards",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const getSets = await getFlashcardSets.getSet(req.user!);

      res.json(getSets);
    } catch (err) {
      res.status(404).json({ message: "User not found" });
    }
  },
);

router.get(
  "/flashcards/:setId",
  authenticateUser,
  async (req: Request, res: Response) => {
    try {
      const { setId } = req.params as { setId: string };
      const getSpecificSet = await userCards.getSpecificSet(req.user!, setId);
      res.json(getSpecificSet);
    } catch (err) {
      res.status(404).json({ message: "Flashcard not found." });
      console.log(err);
    }
  },
);

export default router;
