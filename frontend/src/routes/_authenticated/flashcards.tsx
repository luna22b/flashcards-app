import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";
import type { CreateFlashcardInput } from "#/features/flashcards/types";
import Navbar from "#/components/Navbar";

export const Route = createFileRoute("/_authenticated/flashcards")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext() as { user: { username: string } };

  const [flashcards, setFlashcards] = useState<CreateFlashcardInput>({
    front: "",
    back: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/flashcards",
        flashcards,
        {
          withCredentials: true,
        },
      );

      console.log("FLASHCARD CREATED:", response.data);

      setFlashcards({
        front: "",
        back: "",
      });
    } catch (error) {
      console.error("CREATE FLASHCARD ERROR:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="mt-10 ml-80 font-bold text-xl">
        Welcome to your flashcards, {user.username}!
      </div>

      <div className="mt-2 ml-75 text-gray-600">
        Start by creating your first flashcard below.
      </div>

      <form onSubmit={handleSubmit}>
        <div className="ml-85 mt-25">Type your title</div>

        <input
          type="text"
          value={flashcards.front}
          onChange={(e) =>
            setFlashcards({
              ...flashcards,
              front: e.target.value,
            })
          }
          className="border p-2 rounded bg-amber-100 ml-80"
          required
        />

        <div className="ml-80 mt-10">Type the description</div>

        <textarea
          value={flashcards.back}
          onChange={(e) =>
            setFlashcards({
              ...flashcards,
              back: e.target.value,
            })
          }
          className="rounded bg-amber-100 ml-75 w-80 h-40 border p-4"
          required
        />

        <button
          type="submit"
          className="mt-10 ml-95 bg-black text-white rounded-sm p-2 cursor-pointer"
        >
          Create flashcard
        </button>
      </form>
    </div>
  );
}
