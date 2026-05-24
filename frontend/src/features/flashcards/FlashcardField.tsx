type Props = {
  card: {
    id: string;
    front: string;
    back: string;
  };
};

export function FlashcardField({ card }: Props) {
  return (
    <div>
      <div className="ml-20 mt-5 w-[50em] h-20 border">
        {card.front} - {card.back}
      </div>
    </div>
  );
}
