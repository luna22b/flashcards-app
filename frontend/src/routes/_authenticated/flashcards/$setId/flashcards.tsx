import { createFileRoute } from "@tanstack/react-router";
import { getSpecificCard } from "#/api/flashcard-api";
import Navbar from "#/components/Navbar";

export const Route = createFileRoute(
  "/_authenticated/flashcards/$setId/flashcards",
)({
  loader: async ({ params }) => {
    const flashcardSet = await getSpecificCard(params.setId);

    return flashcardSet;
  },

  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
