import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import FlashcardForm from "#/features/flashcards/FlashcardForm";

export const Route = createFileRoute("/_authenticated/flashcards")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext() as { user: { username: string } };

  return (
    <div>
      <Navbar />
      <div className="mt-10 ml-80 font-bold text-xl">
        Welcome to your flashcards, {user.username}!
      </div>
      <div className="mt-2 ml-75 text-gray-600">
        Start by creating your first flashcard below.
      </div>

      <FlashcardForm />
    </div>
  );
}
