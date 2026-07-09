import { createFileRoute } from "@tanstack/react-router";
import { getSpecificCard } from "#/api/flashcard-api";
import { useState } from "react";
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
  const [isStart, setIsStart] = useState(false);
  const [questionAmount, setQuestionAmount] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [submitQuiz, setSubmitQuiz] = useState(false);
  const amount = Number(questionAmount);

  function generateQuiz(amount: number) {
    // shuffles the cards using the Fisher-Yates algorithm
    const shuffleArray = (arrayToShuffle: any[]) => {
      const cards = [...arrayToShuffle];

      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      return cards;
    };

    const shuffledFlashcards = shuffleArray(flashcardSet.flashcards);

    // selected cards based on the amount of cards the user entered to test
    const selectedCards = shuffledFlashcards.slice(0, amount);

    // maps over the selected cards and creates a new array without current card
    return selectedCards.map((currentCard: any) => {
      const otherCards = flashcardSet.flashcards.filter(
        (card: any) => card.id !== currentCard.id,
      );

      const shuffledCards = shuffleArray(otherCards);

      const distractors = shuffledCards.slice(0, 3);

      const distractorChoices = distractors.map((card) => card.front);

      const choices = [currentCard.front, ...distractorChoices];

      const shuffledChoices = shuffleArray(choices);

      return {
        id: currentCard.id,
        question: currentCard.back,
        choices: shuffledChoices,
        correctAnswer: currentCard.front,
        selectedAnswer: null,
      };
    });
  }

  if (!isStart) {
    const maxQuestions = Math.min(25, flashcardSet.flashcards.length);
    return (
      <div>
        <Navbar />
        <div>Enter number of questions (max {maxQuestions})</div>
        <input
          type="number"
          value={questionAmount}
          onChange={(e) => setQuestionAmount(e.target.value)}
        />
        <button
          onClick={() => {
            if (amount < 1 || amount > maxQuestions) {
              alert(`Please enter a number between 1 and ${maxQuestions}.`);
              return;
            }

            const quiz = generateQuiz(amount);

            console.log(quiz);

            setQuestions(quiz);

            setIsStart(true);
          }}
        >
          Start test
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center gap-5 mt-10">
        {questions.map((question: any) => (
          <div
            key={question.id}
            className="bg-gray-700 text-white rounded-lg p-5 w-108 border-4 border-black"
          >
            <h3 className="text-lg font-bold mb-4 text-center">
              {question.question}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {question.choices.map((choice: string) => (
                <button
                  key={choice}
                  className={`p-3 rounded-lg cursor-pointer ${
                    submitQuiz
                      ? choice === question.correctAnswer
                        ? "bg-green-500"
                        : choice === question.selectedAnswer
                          ? "bg-red-500"
                          : "bg-blue-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={() => {
                    if (submitQuiz) return;

                    setQuestions((prevQuestions) =>
                      prevQuestions.map((q) =>
                        q.id === question.id
                          ? { ...q, selectedAnswer: choice }
                          : q,
                      ),
                    );
                  }}
                >
                  {choice}
                </button>
              ))}
            </div>
            {submitQuiz && question.selectedAnswer === null && (
              <div className="mt-3 text-yellow-400 font-bold justify-center flex">
                Question skipped
              </div>
            )}
          </div>
        ))}
        <button
          className="rounded-lg bg-green-300 p-2"
          disabled={submitQuiz}
          onClick={() => setSubmitQuiz(true)}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
