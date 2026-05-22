import { createFlashcard } from "#/api/flashcard-api";
import { useState } from "react";
import type { CreateFlashcardInput } from "./types";

export default function FlashcardForm() {
  const [flashcards, setFlashcards] = useState<CreateFlashcardInput>({
    front: "",
    back: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newFlashcard = await createFlashcard({
        front: flashcards.front,
        back: flashcards.back,
      });

      console.log(newFlashcard);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="ml-85 mt-25">Type your title</div>
        <input
          type="text"
          value={flashcards.front}
          onChange={(e) =>
            setFlashcards({ ...flashcards, front: e.target.value })
          }
          className="border p-2 rounded bg-amber-100 ml-80"
          required
        />
        <div className="ml-80 mt-10">Type the description</div>
        <input
          type="text"
          value={flashcards.back}
          onChange={(e) =>
            setFlashcards({ ...flashcards, back: e.target.value })
          }
          className="rounded bg-amber-100 ml-75 w-80 h-80 box-border size-32 border p-4"
          required
        />
        <button className="mt-10 ml-95 bg-black text-white rounded-sm p-2 cursor-pointer">
          Create flashcard
        </button>
      </form>
    </div>
  );
}
