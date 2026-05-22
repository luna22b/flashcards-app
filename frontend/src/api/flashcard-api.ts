import axios from "axios";
import type { CreateFlashcardInput } from "#/features/flashcards/types";

// creates flashcard!
export const createFlashcard = async (data: CreateFlashcardInput) => {
  const response = await axios.post(
    "http://localhost:5000/api/flashcards",
    data,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
