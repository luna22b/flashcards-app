import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { getSpecificCard } from "#/api/flashcard-api";

export const Route = createFileRoute("/_authenticated/flashcards/$setId")({
  loader: async ({ params }) => {
    const flashcardSet = await getSpecificCard(params.setId);

    return flashcardSet;
  },

  component: RouteComponent,
});

function RouteComponent() {
  const flashcardSet = Route.useLoaderData();

  return (
    <div>
      <Navbar />

      <div>{flashcardSet.title}</div>
    </div>
  );
}
