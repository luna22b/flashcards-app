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
  const { user } = Route.useRouteContext() as { user: { username: string } };
  const { flashcards } = Route.useRouteContext();

  return (
    <div>
      <Navbar />
      <div>Welcome {user.username}!</div>
      <div>
        These are all your flashcards! To make a new flashcard, create a new set
        below!
      </div>

      <div className="gap-5 grid mt-20 ml-5 cursor-pointer">
        {flashcards.map((card: any) => (
          <div
            key={card.id}
            className="border w-[40em]"
            onClick={() =>
              navigate({
                to: "/flashcards/$setId",
                params: {
                  setId: card.id,
                },
              })
            }
          >
            {card.title}
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate({ to: "/flashcards/create" })}
        className="text-white bg-black rounded-xl mt-50 ml-50 cursor-pointer"
      >
        Create a new set
      </button>
    </div>
  );
}
