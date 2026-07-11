import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { useState } from "react";
import { FlashcardField } from "#/features/flashcards/FlashcardField";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import { API_URL } from "#/api";

export const Route = createFileRoute("/_authenticated/flashcards/create")({
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
    { id: crypto.randomUUID(), front: "", back: "" },
    { id: crypto.randomUUID(), front: "", back: "" },
  ]);

  const [createError, setCreateError] = useState("");

  const handleAddFlashcard = () => {
    const newFlashcard = { id: crypto.randomUUID(), front: "", back: "" };
    setFlashcards([...flashcards, newFlashcard]);
  };

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

  const handleDeleteFlashcard = (id: string) => {
    if (flashcards.length === 1) {
      alert("A flashcard set must contain at least one flashcard.");
      return;
    }

    setFlashcards((cards) => cards.filter((card) => card.id !== id));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setCreateError("");

    const hasValidFlashcard = flashcards.some(
      (card) => card.front.trim() !== "" && card.back.trim() !== "",
    );

    if (!hasValidFlashcard) {
      alert("Please enter a term and definition for at least one flashcard.");
      return;
    }

    const filteredFlashcards = flashcards
      .filter((item) => item.front.trim() !== "" && item.back.trim() !== "")
      .map(({ front, back }) => ({
        front,
        back,
      }));

    try {
      await axios.post(
        `${API_URL}/api/flashcards`,
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
    } catch (error) {
      console.error(error);
      setCreateError("Unable to create flashcard set. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-[Inter]">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Create a New Flashcard Set</h1>

          <p className="mt-3 text-lg text-[#737373]">
            Add a title, description, and start building your flashcards.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-3xl flex-col"
        >
          <textarea
            value={titleAndDesc.title}
            maxLength={80}
            onChange={(e) =>
              setTitleAndDesc((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            required
            placeholder="Title"
            className="resize-none rounded-xl border border-[#ddd] bg-white p-4 text-lg shadow-sm outline-none transition focus:border-[#015d67]"
          />

          <div className="mt-2 text-right text-sm text-[#737373]">
            {titleAndDesc.title.length}/80
          </div>

          <textarea
            value={titleAndDesc.description}
            maxLength={300}
            onChange={(e) =>
              setTitleAndDesc((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Add a description..."
            className="mt-4 resize-none rounded-xl border border-[#ddd] bg-white p-4 shadow-sm outline-none transition focus:border-[#015d67]"
          />

          <div className="mt-2 text-right text-sm text-[#737373]">
            {titleAndDesc.description.length}/300
          </div>

          <ul className="mt-8 space-y-6">
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

          {createError && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {createError}
            </div>
          )}

          <button
            onClick={handleAddFlashcard}
            type="button"
            className="mt-8 cursor-pointer rounded-lg border border-[#ddd] bg-white py-3 font-semibold shadow-sm transition hover:bg-[#f7f7f7]"
          >
            + Add Another Flashcard
          </button>

          <button
            type="submit"
            className="mt-5 cursor-pointer rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-[#222]"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
