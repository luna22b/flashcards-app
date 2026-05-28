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
        All Flashcard Sets
      </div>
      <div className="text-center mt-2 w-75 mx-auto">
        To create a new flashcard set, click the button below!
      </div>
      <button
        onClick={() => navigate({ to: "/flashcards/create" })}
        className="text-white bg-black rounded-lg cursor-pointer flex mx-auto w-40 justify-center mt-5 h-10 items-center"
      >
        Create a new set
      </button>

      <div className="gap-3 grid mt-15 cursor-pointer place-items-center mb-5">
        {flashcards.map((card: any) => (
          <div
            key={card.id}
            className="border-2 w-[21em] sm:w-[25em] h-25 flex justify-content rounded-lg font-bold"
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
