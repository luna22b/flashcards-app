import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { getSpecificCard } from "#/api/flashcard-api";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { SquarePen } from "lucide-react";

export const Route = createFileRoute("/_authenticated/flashcards/$setId/")({
  loader: async ({ params }) => {
    return await getSpecificCard(params.setId);
  },

  pendingComponent: () => (
    <div className="flex h-screen items-center justify-center">
      Loading flashcards...
    </div>
  ),

  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const flashcardSet = Route.useLoaderData();
  const { setId } = Route.useParams();

  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(true);

  const handleIncrement = () => {
    if (currentCard === flashcardSet.flashcards.length - 1) {
      setCurrentCard(0);
    } else {
      setCurrentCard(currentCard + 1);
    }
  };

  const handleDecrement = () => {
    if (currentCard === 0) {
      setCurrentCard(flashcardSet.flashcards.length - 1);
    } else {
      setCurrentCard(currentCard - 1);
    }
  };

  const card = flashcardSet.flashcards[currentCard];

  const handleCardFlip = () => {
    if (isFlipped) {
      setIsFlipped(false);
    } else {
      setIsFlipped(true);
    }
  };

  return (
    <div className="font-[Inter]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="wrap-break-word whitespace-normal text-center text-3xl font-semibold">
          {flashcardSet.title}
        </div>

        <div className="mt-3 wrap-break-word whitespace-normal text-center text-lg text-[#737373]">
          {flashcardSet.description}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#ddd] bg-white px-5 py-2.5 text-sm font-semibold text-[#222] shadow-sm transition hover:bg-[#f7f7f7]"
            onClick={() =>
              navigate({
                to: "/flashcards/$setId/edit",
                params: {
                  setId,
                },
              })
            }
          >
            <SquarePen className="size-4.5" />
            Edit Flashcards
          </button>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div
            className="flex min-h-72 w-full max-w-2xl cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#ddd] bg-white p-8 text-center shadow-lg transition-shadow hover:shadow-xl"
            onClick={handleCardFlip}
          >
            <div className="max-w-full wrap-break-word whitespace-normal text-2xl leading-relaxed font-semibold">
              {isFlipped ? card.front : card.back}
            </div>

            <p className="mt-8 text-sm text-[#999]">Tap to flip</p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <ChevronLeftIcon
              onClick={handleDecrement}
              className="size-10 cursor-pointer rounded-full bg-[#f2f2f2] p-2 transition hover:bg-[#ddd]"
            />

            <p className="text-lg font-semibold">
              {currentCard + 1} / {flashcardSet.flashcards.length}
            </p>

            <ChevronRightIcon
              onClick={handleIncrement}
              className="size-10 cursor-pointer rounded-full bg-[#f2f2f2] p-2 transition hover:bg-[#ddd]"
            />
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-md grid-cols-2 gap-4">
            <button
              onClick={() =>
                navigate({
                  to: "/flashcards/$setId/test",
                  params: {
                    setId,
                  },
                })
              }
              className="cursor-pointer rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-[#222]"
            >
              Test
            </button>

            <button
              onClick={() =>
                navigate({
                  to: "/flashcards/$setId/flashcards",
                  params: {
                    setId,
                  },
                })
              }
              className="cursor-pointer rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-[#222]"
            >
              Flashcards
            </button>
          </div>

          <div className="mt-16 flex w-full flex-col gap-6">
            {flashcardSet.flashcards.map((card: any) => (
              <div
                key={card.id}
                className="mx-auto flex h-64 w-full max-w-3xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#ddd] bg-white p-6 text-center shadow-md"
              >
                <div className="max-w-full wrap-break-word whitespace-normal text-xl leading-relaxed font-semibold">
                  {card.front}
                </div>

                <div className="mt-5 max-w-full wrap-break-word whitespace-normal leading-relaxed text-[#666]">
                  {card.back}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
