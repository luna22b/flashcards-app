import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { useState } from "react";
import { FlashcardField } from "#/features/flashcards/FlashcardField";
import axios from "axios";

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
  const [frontAndBack, setFrontAndBack] = useState<FlashcardSetForm>({
    title: "",
    description: "",
  });

  // initialized with two flashcards at the start so that the user has two flashcards to work with
  // automatically
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: crypto.randomUUID(), front: "", back: "" },
    { id: crypto.randomUUID(), front: "", back: "" },
  ]);

  // handles the adding of a flashcard by adding a new object to the state
  const handleAddFlashcard = () => {
    const newFlashcard = { id: crypto.randomUUID(), front: "", back: "" };
    setFlashcards([...flashcards, newFlashcard]);
  };

  // handles updating in the other file by lifting state up
  const handleUpdate = (
    id: string,
    field: "front" | "back",
    newValue: string,
  ) => {
    setFlashcards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, [field]: newValue } : card,
      ),
    );
  };

  // handles deletion by filtering the id of the card that was clicked on
  const handleDeleteFlashcard = (id: string) => {
    setFlashcards((c) => c.filter((card) => card.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredCards = flashcards.filter(
      (item) => item.front.trim() !== "" || item.back.trim() !== "",
    );

    try {
      const response = await axios.post(
        "http://localhost:5000/api/flashcards",
        {
          flashcards: filteredCards,
          title: frontAndBack.title,
          description: frontAndBack.description,
        },
        {
          withCredentials: true,
        },
      );
      console.log("Response", response);
    } catch (error) {
      console.error(error);
    }

    console.log(filteredCards);
  };

  return (
    <div>
      <Navbar />
      <div className="text-xl mt-10 ml-20">Create a new flashcard set</div>
      <div className="mt-10 mb-2 ml-20">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={frontAndBack.title}
            onChange={(e) =>
              setFrontAndBack((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Title"
            required
            className="w-[50em] border mb-2"
          />

          <div>
            <input
              type="text"
              value={frontAndBack.description}
              onChange={(e) =>
                setFrontAndBack((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Description"
              className="w-[50em] border"
            />
          </div>
          <div>
            <ul>
              {flashcards.map((card) => (
                <li key={card.id}>
                  <FlashcardField
                    card={card}
                    onUpdate={(field, val) => handleUpdate(card.id, field, val)}
                    onClick={() => handleDeleteFlashcard(card.id)}
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={handleAddFlashcard}
              className="ml-20 cursor-pointer"
              type="button"
            >
              Add new flashcard
            </button>
            <button
              type="submit"
              className="border-green-400 border mt-5 cursor-pointer"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
