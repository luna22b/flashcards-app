import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  card: {
    id: string;
    front: string;
    back: string;
  };
  onClick: () => void;
  onUpdate: (field: "front" | "back", newValue: string) => void;
};

export function FlashcardField({ card, onClick, onUpdate }: Props) {
  return (
    <div className="rounded-2xl border border-[#ddd] bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
      <div className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#333]">
            Term
          </label>

          <input
            type="text"
            value={card.front}
            maxLength={80}
            onChange={(e) => onUpdate("front", e.target.value)}
            placeholder="Enter a term"
            className="w-full rounded-xl border border-[#ddd] px-4 py-3 outline-none transition focus:border-[#015d67]"
          />

          <div className="mt-2 text-right text-sm text-[#737373]">
            {card.front.length}/80
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#333]">
            Definition
          </label>

          <input
            type="text"
            value={card.back}
            maxLength={200}
            onChange={(e) => onUpdate("back", e.target.value)}
            placeholder="Enter the definition"
            className="w-full rounded-xl border border-[#ddd] px-4 py-3 outline-none transition focus:border-[#015d67]"
          />

          <div className="mt-2 text-right text-sm text-[#737373]">
            {card.back.length}/200
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClick}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-red-50"
          >
            <TrashIcon className="size-5 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
