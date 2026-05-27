import axios from "axios";

export const getFlashcards = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/flashcards", {
      withCredentials: true,
    });
    console.log(res);
    return res.data;
  } catch {
    return null;
  }
};
