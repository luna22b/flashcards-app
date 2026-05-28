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
    <div className="border mt-5 h-50 rounded-lg w-[21em]">
      <div>
        <input
          type="text"
          value={card.front}
          onChange={(e) => onUpdate("front", e.target.value)}
          className="w-[20em] p-4 mt-5 border flex mx-auto rounded-sm"
          placeholder="Enter term"
        />
      </div>

      <div>
        <input
          type="text"
          value={card.back}
          onChange={(e) => onUpdate("back", e.target.value)}
          className="w-[20em] p-4 mt-5 border flex mx-auto rounded-sm"
          placeholder="Enter definition"
        />
      </div>

      <div>
        <TrashIcon
          type="button"
          onClick={onClick}
          className="cursor-pointer size-5 mx-auto mt-3"
        />
      </div>
    </div>
  );
}
