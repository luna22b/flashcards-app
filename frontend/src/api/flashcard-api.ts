import axios from "axios";

export const getFlashcards = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/flashcards", {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

export const getSpecificCard = async (setId: string) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/flashcards/${setId}`,
      {
        withCredentials: true,
      },
    );
    return res.data;
  } catch {
    return null;
  }
};
