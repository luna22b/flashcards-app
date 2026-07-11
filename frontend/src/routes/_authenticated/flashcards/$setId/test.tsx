import { createFileRoute } from "@tanstack/react-router";
import { getSpecificCard } from "#/api/flashcard-api";
import { useState } from "react";
import Navbar from "#/components/Navbar";

export const Route = createFileRoute("/_authenticated/flashcards/$setId/test")({
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
  const flashcardSet = Route.useLoaderData();
  const [isStart, setIsStart] = useState(false);
  const [questionAmount, setQuestionAmount] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [submitQuiz, setSubmitQuiz] = useState(false);
  const [amountError, setAmountError] = useState("");

  const amount = Number(questionAmount);

  const correctCount = questions.filter(
    (question) => question.selectedAnswer === question.correctAnswer,
  ).length;

  const wrongCount = questions.filter(
    (question) =>
      question.selectedAnswer !== null &&
      question.selectedAnswer !== question.correctAnswer,
  ).length;

  const skippedCount = questions.filter(
    (question) => question.selectedAnswer === null,
  ).length;

  function generateQuiz(amount: number) {
    const shuffleArray = (arrayToShuffle: any[]) => {
      const cards = [...arrayToShuffle];

      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }

      return cards;
    };

    const shuffledFlashcards = shuffleArray(flashcardSet.flashcards);

    const selectedCards = shuffledFlashcards.slice(0, amount);

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
      <div className="min-h-screen bg-[#fcfcfc] font-[Inter]">
        <Navbar />

        <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20">
          <h1 className="text-center text-3xl font-semibold">
            Start Your <span className="text-[#015d67]">Test</span>
          </h1>

          <p className="mt-3 text-center text-lg text-[#737373]">
            Enter how many questions you'd like to be tested on.
          </p>

          <p className="mt-2 text-sm text-[#999]">
            Maximum: {maxQuestions} questions
          </p>

          {amountError && (
            <div className="mt-5 w-full rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600">
              {amountError}
            </div>
          )}

          <input
            type="number"
            value={questionAmount}
            min={1}
            onChange={(e) => {
              setAmountError("");
              setQuestionAmount(e.target.value);
            }}
            className="mt-8 w-full rounded-xl border border-[#ddd] bg-white p-4 text-center text-lg shadow-sm outline-none transition focus:border-[#015d67]"
          />

          <button
            onClick={() => {
              if (amount < 1 || amount > maxQuestions) {
                setAmountError(
                  `Please enter a number between 1 and ${maxQuestions}.`,
                );
                return;
              }

              const quiz = generateQuiz(amount);

              setQuestions(quiz);

              setIsStart(true);
            }}
            className="mt-6 w-full cursor-pointer rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-[#222]"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-[Inter]">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Flashcard <span className="text-[#015d67]">Test</span>
          </h1>

          <p className="mt-3 text-lg text-[#737373]">
            Choose the correct answer for each definition.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8">
          {questions.map((question: any, index) => (
            <div
              key={question.id}
              className="rounded-2xl border border-[#ddd] bg-white p-8 shadow-lg"
            >
              <div className="mb-2 text-sm font-medium text-[#888]">
                Question {index + 1}
              </div>

              <h3 className="mb-8 wrap-break-word whitespace-normal text-center text-2xl text-[#222]">
                {question.question}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {question.choices.map((choice: string) => (
                  <button
                    key={choice}
                    className={`wrap-break-word whitespace-normal rounded-xl border p-4 text-left font-medium transition ${
                      submitQuiz
                        ? choice === question.correctAnswer
                          ? "border-[#8bb89c] bg-[#e8f3eb] text-[#3f6b4c]"
                          : choice === question.selectedAnswer
                            ? "border-red-500 bg-red-100 text-red-700"
                            : "border-[#ddd] bg-[#f8f8f8]"
                        : choice === question.selectedAnswer
                          ? "cursor-pointer border-[#015d67] bg-[#015d67] text-white"
                          : "cursor-pointer border-[#ddd] bg-white hover:border-[#015d67] hover:bg-[#f8fbfb]"
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
                <div className="mt-6 text-center font-semibold text-yellow-600">
                  Question skipped
                </div>
              )}
            </div>
          ))}

          {!submitQuiz ? (
            <button
              disabled={submitQuiz}
              className={`mx-auto mt-4 w-full max-w-sm rounded-lg py-3 font-semibold text-white transition ${
                submitQuiz
                  ? "cursor-not-allowed bg-gray-400"
                  : "cursor-pointer bg-black hover:bg-[#222]"
              }`}
              onClick={() => {
                setSubmitQuiz(true);
              }}
            >
              Submit Quiz
            </button>
          ) : (
            <div className="mx-auto mt-10 w-full max-w-2xl rounded-2xl border border-[#ddd] bg-white p-8 text-center shadow-lg">
              <h2 className="text-3xl font-semibold">
                Quiz <span className="text-[#015d67]">Complete!</span>
              </h2>

              <p className="mt-3 wrap-break-word whitespace-normal text-lg text-[#737373]">
                Nice work! Keep practicing to strengthen your memory and improve
                your recall.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#ddd] bg-[#fafafa] p-5">
                  <p className="text-sm text-[#777]">Correct</p>

                  <p className="mt-1 text-3xl font-semibold text-[#3f6b4c]">
                    {correctCount}
                  </p>
                </div>

                <div className="rounded-xl border border-[#ddd] bg-[#fafafa] p-5">
                  <p className="text-sm text-[#777]">Incorrect</p>

                  <p className="mt-1 text-3xl font-semibold text-red-500">
                    {wrongCount}
                  </p>
                </div>

                <div className="rounded-xl border border-[#ddd] bg-[#fafafa] p-5">
                  <p className="text-sm text-[#777]">Skipped</p>

                  <p className="mt-1 text-3xl font-semibold text-yellow-500">
                    {skippedCount}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => {
                    setQuestions((prev) =>
                      prev.map((q) => ({
                        ...q,
                        selectedAnswer: null,
                      })),
                    );

                    setSubmitQuiz(false);
                  }}
                  className="cursor-pointer rounded-lg border border-[#ddd] bg-white px-8 py-3 font-semibold transition hover:bg-[#f7f7f7]"
                >
                  Retake Test
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className="cursor-pointer rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-[#222]"
                >
                  Create New Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
