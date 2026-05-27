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
    <div>
      <div className="mt-5 w-[50em] h-25 border">
        <div>
          <input
            type="text"
            value={card.front}
            onChange={(e) => onUpdate("front", e.target.value)}
            className="border w-full p-1"
            placeholder="Enter term"
          />
        </div>

        <div>
          <input
            type="text"
            value={card.back}
            onChange={(e) => onUpdate("back", e.target.value)}
            className="border w-full p-1"
            placeholder="Enter definition"
          />
        </div>

        <div>
          <button type="button" onClick={onClick} className="cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
