import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import FlashcardForm from "#/features/flashcards/FlashcardForm";
import FlashcardList from "#/features/flashcards/FlashcardList";
import { useState } from "react";
import type { Flashcard } from "#/features/flashcards/types";

export const Route = createFileRoute("/_authenticated/flashcards")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext() as { user: { username: string } };
  const [cards, setCards] = useState<Flashcard[]>([]);

  const handleCardCreated = (newCard: Flashcard) => {
    setCards((prevCards) => [newCard, ...prevCards]);
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
      <FlashcardForm onCardCreated={handleCardCreated} />
      <FlashcardList cards={cards} />
    </div>
  );
}
