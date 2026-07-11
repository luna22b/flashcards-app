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

export const getFlashcardSets = {
  async getSet(userId: string) {
    const getFlashcards = await prisma.flashcardSet.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        flashcards: true,
      },
    });

    return getFlashcards;
  },
};

export const userCards = {
  async getSpecificSet(userId: string, setId: string) {
    const getCard = await prisma.flashcardSet.findFirst({
      where: { userId, id: setId },
      select: {
        id: true,
        title: true,
        description: true,
        flashcards: true,
      },
    });
    return getCard;
  },
};

export const editSet = {
  async editSpecificSet(
    userId: string,
    setId: string,
    title: string,
    description: string,
    flashcards: { front: string; back: string }[],
  ) {
    const updatedSet = await prisma.flashcardSet.update({
      where: {
        id: setId,
        userId,
      },
      data: {
        title,
        description,
      },
    });

    await prisma.flashcard.deleteMany({
      where: {
        setId,
      },
    });

    await prisma.flashcard.createMany({
      data: flashcards.map((card) => ({
        front: card.front,
        back: card.back,
        setId,
      })),
    });

    return updatedSet;
  },
};

export const deleteSet = {
  async deleteSpecificSet(userId: string, setId: string) {
    console.log(setId, userId);
    const deleteSet = await prisma.flashcardSet.delete({
      where: {
        id: setId,
        userId,
      },
    });

    return deleteSet;
  },
};
