import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { getFlashcards } from "#/api/flashcard-api";

export const Route = createFileRoute("/_authenticated/flashcards/")({
  beforeLoad: async () => {
    const flashcards = await getFlashcards();

    return { flashcards: flashcards ?? [] };
  },

  pendingComponent: () => (
    <div className="flex min-h-screen items-center justify-center font-[Inter]">
      <div className="text-lg font-semibold text-[#737373]">
        Loading flashcards...
      </div>
    </div>
  ),

  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { flashcards } = Route.useRouteContext();

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-[Inter]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">All Flashcard Sets</h1>

          <p className="mx-auto mt-3 max-w-xl text-lg text-[#737373]">
            Organize your study material into flashcard sets and review them
            whenever you need.
          </p>

          {flashcards.length > 0 && (
            <button
              onClick={() => navigate({ to: "/flashcards/create" })}
              className="mt-8 cursor-pointer rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-[#222]"
            >
              Create New Set
            </button>
          )}
        </div>

        {flashcards.length === 0 ? (
          <div className="mx-auto mt-14 flex max-w-md flex-col items-center rounded-2xl border border-[#ddd] bg-white p-10 text-center shadow-md">
            <h2 className="text-2xl font-semibold">No Flashcard Sets Yet</h2>

            <p className="mt-3 text-[#737373]">
              Create your first flashcard set to start studying and organizing
              your material.
            </p>

            <button
              onClick={() => navigate({ to: "/flashcards/create" })}
              className="mt-6 cursor-pointer rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-[#222]"
            >
              Create Your First Set
            </button>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {flashcards.map((card: any) => (
              <div
                key={card.id}
                onClick={() =>
                  navigate({
                    to: "/flashcards/$setId",
                    params: {
                      setId: card.id,
                    },
                  })
                }
                className="cursor-pointer rounded-2xl border border-[#ddd] bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="wrap-break-word whitespace-normal text-xl font-semibold text-black">
                  {card.title}
                </div>

                <div className="mt-3 text-[#737373]">
                  {card.flashcards.length}{" "}
                  {card.flashcards.length === 1 ? "Term" : "Terms"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
