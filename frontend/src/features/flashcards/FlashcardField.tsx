type Props = {
  card: {
    id: string;
    front: string;
    back: string;
  };
  onClick: () => void;
};

export function FlashcardField({ card, onClick }: Props) {
  return (
    <div>
      <div className="ml-20 mt-5 w-[50em] h-20 border">
        {card.front} {card.back}
        <div>
          <button onClick={onClick} className="cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
