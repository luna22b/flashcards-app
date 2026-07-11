import { createFileRoute } from "@tanstack/react-router";
import { getSpecificCard } from "#/api/flashcard-api";
import Navbar from "#/components/Navbar";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Route = createFileRoute(
  "/_authenticated/flashcards/$setId/flashcards",
)({
  loader: async ({ params }) => {
    const flashcardSet = await getSpecificCard(params.setId);

    return flashcardSet;
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
  const flashcardSet = Route.useLoaderData();

  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(true);

  const handleIncrement = () => {
    if (currentCard === flashcardSet.flashcards.length - 1) {
      setCurrentCard(0);
    } else {
      setCurrentCard(currentCard + 1);
    }

    setIsFlipped(true);
  };

  const handleDecrement = () => {
    if (currentCard === 0) {
      setCurrentCard(flashcardSet.flashcards.length - 1);
    } else {
      setCurrentCard(currentCard - 1);
    }

    setIsFlipped(true);
  };

  const handleCardFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const card = flashcardSet.flashcards[currentCard];

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-[Inter]">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="text-center">
          <h1 className="wrap-break-word whitespace-normal text-3xl font-semibold">
            {flashcardSet.title}
          </h1>

          <p className="mt-3 wrap-break-word whitespace-normal text-lg text-[#737373]">
            {flashcardSet.description}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div
            onClick={handleCardFlip}
            className="flex min-h-80 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#ddd] bg-white px-8 py-10 text-center shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="max-w-full wrap-break-word whitespace-normal text-2xl leading-relaxed font-semibold text-[#222]">
              {isFlipped ? card.front : card.back}
            </p>

            <p className="mt-8 text-sm text-[#999]">Tap to flip</p>
          </div>

          <div className="mt-10">
            <div className="mb-3 flex justify-between text-sm font-medium text-[#666]">
              <span>Card {currentCard + 1}</span>

              <span>{flashcardSet.flashcards.length} Total</span>
            </div>

            <div className="h-2 w-full rounded-full bg-[#e8e8e8]">
              <div
                className="h-full rounded-full bg-[#015d67] transition-all"
                style={{
                  width: `${
                    ((currentCard + 1) / flashcardSet.flashcards.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8">
            <button
              onClick={handleDecrement}
              className="cursor-pointer rounded-full bg-white p-3 shadow-md transition hover:shadow-lg"
            >
              <ChevronLeftIcon className="size-7" />
            </button>

            <div className="text-lg font-semibold text-[#333]">
              {currentCard + 1} / {flashcardSet.flashcards.length}
            </div>

            <button
              onClick={handleIncrement}
              className="cursor-pointer rounded-full bg-white p-3 shadow-md transition hover:shadow-lg"
            >
              <ChevronRightIcon className="size-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
