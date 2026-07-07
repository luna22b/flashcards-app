import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { getSpecificCard } from "#/api/flashcard-api";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Route = createFileRoute("/_authenticated/flashcards/$setId/")({
  loader: async ({ params }) => {
    const flashcardSet = await getSpecificCard(params.setId);

    return flashcardSet;
  },

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
    <div>
      <Navbar />
      <div className="mt-6 font-bold text-2xl flex justify-center">
        {flashcardSet.title}
      </div>
      <div className="mt-3 text-sm flex justify-center">
        {flashcardSet.description}
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <div
            className="bg-gray-700 text-white mt-6 h-55 w-[21em] rounded-lg border-2 border-black text-center font-bold cursor-pointer flex justify-center items-center"
            onClick={handleCardFlip}
          >
            {isFlipped ? <div>{card.front}</div> : <div>{card.back}</div>}
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-2">
          <ChevronLeftIcon
            onClick={handleDecrement}
            className="size-7 bg-gray-300 rounded-xl cursor-pointer"
          />
          <p className="font-bold flex justify-center items-center">
            {currentCard + 1} / {flashcardSet.flashcards.length}
          </p>
          <ChevronRightIcon
            onClick={handleIncrement}
            className="size-7 bg-gray-300 rounded-xl cursor-pointer"
          />
        </div>
        <div className="w-[20em] grid grid-cols-2 gap-4 mx-auto mt-10">
          <button
            onClick={() =>
              navigate({
                to: "/flashcards/$setId/test",
                params: {
                  setId,
                },
              })
            }
            className="bg-gray-500 p-4 rounded-lg text-center cursor-pointer text-white font-bold"
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
            className="bg-gray-500 p-4 rounded-lg text-center cursor-pointer text-white font-bold"
          >
            Flashcards
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mt-10 gap-5">
          {flashcardSet.flashcards.map((card: any) => (
            <div
              key={card.id}
              className="bg-gray-700 text-white rounded-lg w-[27em] text-center h-55 border-4 border-black"
            >
              <div>{card.front}</div>
              <div>{card.back}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
