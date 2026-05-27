import { prisma } from "../prisma";

export const NewFlashcardSet = {
  async newSet(data: {
    title: string;
    description: string;
    userId: string;
    flashcards: {
      front: string;
      back: string;
    }[];
  }) {
    const set = await prisma.flashcardSet.create({
      data: {
        title: data.title,
        description: data.description,
        userId: data.userId,
        flashcards: {
          create: data.flashcards,
        },
      },
      include: {
        flashcards: true,
      },
    });

    return {
      id: set.id,
      title: set.title,
      description: set.description,
      flashcards: set.flashcards,
    };
  },
};
