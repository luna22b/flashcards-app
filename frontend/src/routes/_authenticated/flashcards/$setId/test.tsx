import { createFileRoute } from "@tanstack/react-router";
import { getSpecificCard } from "#/api/flashcard-api";
import Navbar from "#/components/Navbar";

export const Route = createFileRoute("/_authenticated/flashcards/$setId/test")({
  loader: async ({ params }) => {
    const flashcardSet = await getSpecificCard(params.setId);

    return flashcardSet;
  },

  component: RouteComponent,
});

function RouteComponent() {
  const flashcardSet = Route.useLoaderData();
  console.log(flashcardSet);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10 gap-5">
        {flashcardSet.flashcards.map((card: any) => (
          <div
            key={card.id}
            className="bg-gray-700 text-white rounded-lg w-[27em] text-center h-55 border-4 border-black"
          >
            <div>{card.front}</div>
            <div>Choose an answer</div>
            <div>{card.back}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
