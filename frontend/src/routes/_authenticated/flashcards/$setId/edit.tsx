import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { FlashcardField } from "#/features/flashcards/FlashcardField";
import { getSpecificCard } from "#/api/flashcard-api";
import { useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { API_URL } from "#/api";

export const Route = createFileRoute("/_authenticated/flashcards/$setId/edit")({
  loader: async ({ params }) => {
    const flashcardSet = await getSpecificCard(params.setId);

    return flashcardSet;
  },

  pendingComponent: () => (
    <div className="flex h-screen items-center justify-center font-[Inter]">
      Loading flashcard set...
    </div>
  ),

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
  const flashcardSet = Route.useLoaderData();
  const { setId } = Route.useParams();
  const navigate = useNavigate();

  const [titleAndDesc, setTitleAndDesc] = useState<FlashcardSetForm>({
    title: flashcardSet.title,
    description: flashcardSet.description,
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>(
    flashcardSet.flashcards,
  );

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleAddFlashcard = () => {
    const newFlashcard = {
      id: crypto.randomUUID(),
      front: "",
      back: "",
    };

    setFlashcards((prev) => [...prev, newFlashcard]);
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

  const saveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/api/flashcards/${setId}`,
        {
          title: titleAndDesc.title,
          description: titleAndDesc.description,
          flashcards,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response);

      navigate({ to: "/flashcards" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSet = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/flashcards/${setId}`,
        {
          withCredentials: true,
        },
      );

      console.log(response);

      navigate({ to: "/flashcards" });
    } catch (error) {
      console.error(error);
      alert("Unable to delete flashcard set.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-[Inter]">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Edit Flashcard Set</h1>

          <p className="mt-3 text-lg text-[#737373]">
            Update your title, description, and flashcards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDeleteWarning(true)}
          className="mx-auto mt-8 flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-white px-6 py-3 font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
        >
          <Trash2 className="size-5" />
          Delete Flashcard Set
        </button>

        {showDeleteWarning && (
          <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-red-200 bg-white p-6 text-center shadow-lg">
            <h2 className="text-xl font-semibold text-[#222]">
              Delete Flashcard Set?
            </h2>

            <p className="mt-3 text-[#737373]">
              Are you sure you want to delete this flashcard set? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowDeleteWarning(false)}
                className="cursor-pointer rounded-lg border border-[#ddd] bg-white px-6 py-3 font-semibold transition hover:bg-[#f7f7f7]"
              >
                Cancel
              </button>

              <button
                type="button"
                className="cursor-pointer rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                onClick={handleDeleteSet}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={saveChanges}
          className="mx-auto mt-10 flex max-w-3xl flex-col"
        >
          <input
            type="text"
            value={titleAndDesc.title}
            onChange={(e) =>
              setTitleAndDesc((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Title"
            className="rounded-xl border border-[#ddd] bg-white p-4 text-lg shadow-sm outline-none transition focus:border-[#015d67]"
          />

          <input
            type="text"
            value={titleAndDesc.description}
            onChange={(e) =>
              setTitleAndDesc((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Add a description..."
            className="mt-4 rounded-xl border border-[#ddd] bg-white p-4 shadow-sm outline-none transition focus:border-[#015d67]"
          />

          <ul className="mt-8 space-y-6">
            {flashcards.map((card) => (
              <li key={card.id}>
                <FlashcardField
                  card={card}
                  onUpdate={(field, value) =>
                    handleUpdate(card.id, field, value)
                  }
                  onClick={() => handleDeleteFlashcard(card.id)}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleAddFlashcard}
            className="mt-8 cursor-pointer rounded-lg border border-[#ddd] bg-white py-3 font-semibold shadow-sm transition hover:bg-[#f7f7f7]"
          >
            + Add Another Flashcard
          </button>

          <button
            type="submit"
            className="mt-5 cursor-pointer rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-[#222]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
