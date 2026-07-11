import axios from "axios";
import { API_URL } from "#/api";

export const getFlashcards = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/flashcards`, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

export const getSpecificCard = async (setId: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/flashcards/${setId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};
