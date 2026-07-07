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

  const quizQuestions = flashcardSet.flashcards.map((currentCard: any) => {
    // disallows duplication
    const otherCards = flashcardSet.flashcards.filter(
      (card: any) => card.id !== currentCard.id,
    );

    // shuffles the cards
    const shuffledCards = [...otherCards].sort(() => Math.random() - 0.5);

    // makes it so it only gives me 3 distractors (will be 2 if the flashcard set has 3 cards)
    const distractors = shuffledCards.slice(0, 3);

    // we only want the front of the card in our array
    const distractorFronts = distractors.map((card: any) => card.front);

    // makes an array and returns the choices. the correct card with all the distractors
    // we randomize it so that the right answers isn't always first
    const choices = [currentCard.front, ...distractorFronts].sort(
      () => Math.random() - 0.5,
    );

    return {
      id: currentCard.id,
      question: currentCard.back,
      choices,
      correctAnswer: currentCard.front,
    };
  });

  console.log("hi: ", quizQuestions);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10 gap-5">
        {quizQuestions.map((card: any) => (
          <div
            key={card.id}
            className="bg-gray-700 text-white rounded-lg w-[27em] text-center h-55 border-4 border-black"
          >
            <button>{card.choices}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
