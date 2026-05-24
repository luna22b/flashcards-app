import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { useState } from "react";
import { FlashcardField } from "#/features/flashcards/FlashcardField";

export const Route = createFileRoute("/_authenticated/flashcards")({
  component: RouteComponent,
});

// interfaces
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

  // initialized with two flashcards at the start so that the user has two flashcards to work with
  // automatically
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: crypto.randomUUID(), front: "Hello", back: "Back" },
    { id: crypto.randomUUID(), front: "Hi", back: "Front" },
  ]);

  // handles the adding of a flashcard by adding a new object to the state
  const handleAddFlashcard = () => {
    const newFlashcard = { id: crypto.randomUUID(), front: "What", back: "No" };
    setFlashcards([...flashcards, newFlashcard]);
  };

  // handles deletion by filtering the id of the card that was clicked on
  const handleDeleteFlashcard = (id: string) => {
    setFlashcards((c) => c.filter((card) => card.id !== id));
  };

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
              <FlashcardField
                card={card}
                onClick={() => handleDeleteFlashcard(card.id)}
              />
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
