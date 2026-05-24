import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { useState } from "react";
import { FlashcardField } from "#/features/flashcards/FlashcardField";

export const Route = createFileRoute("/_authenticated/flashcards")({
  component: RouteComponent,
});

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface FlashcardSetForm {
  title: string;
  description: string;
}

function RouteComponent() {
  const [titleAndDesc, setTitleAndDesc] = useState<FlashcardSetForm>({
    title: "",
    description: "",
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: crypto.randomUUID(), front: "Hello", back: "Back" },
    { id: crypto.randomUUID(), front: "Hi", back: "Front" },
  ]);

  const handleAddFlashcard = () => {
    const newFlashcard = { id: crypto.randomUUID(), front: "What", back: "No" };
    setFlashcards([...flashcards, newFlashcard]);
  };

  const handleDeleteFlashcard = () => {};

  return (
    <div>
      <Navbar />
      <div className="text-xl mt-10 ml-20">Create a new flashcard set</div>
      <form className="ml-20">
        <div className="mt-10 mb-2">
          <input
            type="text"
            value={titleAndDesc.title}
            onChange={(e) =>
              setTitleAndDesc((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Title"
            required
            className="w-[50em] border"
          />
        </div>
        <div>
          <input
            type="text"
            value={titleAndDesc.description}
            onChange={(e) =>
              setTitleAndDesc((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Description"
            className="w-[50em] border"
          />
        </div>
      </form>
      <div>
        <ul>
          {flashcards.map((card) => (
            <li key={card.id}>
              <FlashcardField card={card} />
            </li>
          ))}
        </ul>
        <button onClick={handleAddFlashcard} className="ml-20 cursor-pointer">
          Add new flashcard
        </button>
      </div>
    </div>
  );
}
