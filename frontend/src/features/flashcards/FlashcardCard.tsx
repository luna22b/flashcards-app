import type { FlashcardCardProps } from "./types";

export default function FlashcardCard({ card }: FlashcardCardProps) {
  return (
    <div className="border p-4 rounded bg-amber-50 shadow-sm border-amber-200">
      <div className="text-xs uppercase font-bold text-amber-800 tracking-wider">
        Front
      </div>
      <div className="text-lg font-medium mb-2 wrap-break-words text-gray-900">
        {card.front}
      </div>

      <hr className="my-2 border-amber-200" />

      <div className="text-xs uppercase font-bold text-amber-800 tracking-wider">
        Back
      </div>
      <div className="text-gray-700 wrap-break-words whitespace-pre-wrap">
        {card.back}
      </div>
    </div>
  );
}
