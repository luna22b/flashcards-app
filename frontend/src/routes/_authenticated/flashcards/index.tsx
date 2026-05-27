import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { getFlashcards } from "#/api/flashcard-api";

export const Route = createFileRoute("/_authenticated/flashcards/")({
  beforeLoad: async () => {
    const flashcards = await getFlashcards();

    return { flashcards: flashcards ?? [] };
  },

  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { flashcards } = Route.useRouteContext();

  return (
    <div>
      <Navbar />
      <div className="mt-6 font-bold text-2xl flex justify-center">
        All Flashcards
      </div>
      <div className="text-center mt-2">
        To make a new flashcard, create a new set below!
      </div>
      <button
        onClick={() => navigate({ to: "/flashcards/create" })}
        className="text-white bg-black rounded-lg cursor-pointer flex mx-auto w-40 justify-center mt-5 h-10 items-center"
      >
        Create a new set
      </button>

      <div className="gap-3 grid mt-15 cursor-pointer place-items-center">
        {flashcards.map((card: any) => (
          <div
            key={card.id}
            className="border w-[21em] h-25 flex justify-content rounded-lg font-bold"
            onClick={() =>
              navigate({
                to: "/flashcards/$setId",
                params: {
                  setId: card.id,
                },
              })
            }
          >
            <div className="p-2 mt-2">
              <div>{card.title}</div>
              <div className="font-normal text-sm">
                {card.flashcards.length} Terms
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
