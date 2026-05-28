import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { useState } from "react";
import { FlashcardField } from "#/features/flashcards/FlashcardField";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/flashcards/create")({
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

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredFlashcards = flashcards
      .filter((item) => item.front.trim() !== "" && item.back.trim() !== "")
      .map(({ front, back }) => ({
        front,
        back,
      }));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/flashcards",
        {
          flashcards: filteredFlashcards,
          title: titleAndDesc.title,
          description: titleAndDesc.description,
        },
        {
          withCredentials: true,
        },
      );
      navigate({ to: "/flashcards" });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="mt-6 font-bold text-xl flex justify-center">
        Create a new flashcard set
      </div>

      <div className="flex flex-col items-center mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="textarea"
            value={titleAndDesc.title}
            onChange={(e) =>
              setTitleAndDesc((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Title"
            className="w-[21em] border mb-2 rounded-lg p-3 min-h-10 max-h-50 overflow-hidden resize-none"
          />

          <input
            type="textarea"
            value={titleAndDesc.description}
            onChange={(e) =>
              setTitleAndDesc((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Add a description..."
            className="w-[21em] border mb-2 rounded-lg p-3 field-sizing-content"
          />

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
            className="mt-4 cursor-pointer"
            type="button"
          >
            Add new flashcard
          </button>

          <button
            type="submit"
            className="border border-green-400 mt-5 px-3 py-1 rounded cursor-pointer"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
