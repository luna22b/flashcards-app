import type { Flashcard } from "./types";
import FlashcardCard from "./FlashcardCard";

interface FlashcardListProps {
  cards: Flashcard[];
}

export default function FlashcardList({ cards }: FlashcardListProps) {
  return (
    <div className="mt-10 ml-80 max-w-xl">
      <h2 className="text-lg font-semibold mb-4">Your Deck ({cards.length})</h2>

      {cards.length === 0 ? (
        <p className="text-gray-400 italic">
          No cards added yet. Create one above!
        </p>
      ) : (
        <div className="grid gap-4">
          {cards.map((card, index) => (
            <FlashcardCard key={card.id || index} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}
