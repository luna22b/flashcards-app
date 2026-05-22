import { prisma } from "../prisma";

export const createFlashcard = async (
  data: { front: string; back: string },
  userId: string,
) => {
  const flashcard = await prisma.flashcards.create({
    data: {
      front: data.front,
      back: data.back,
      userId: userId,
    },
  });
  return flashcard;
};
