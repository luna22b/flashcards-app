type CardProps = {
  label: string;
};

const Card = ({ label }: CardProps) => (
  <div className="flex flex-col items-center justify-center outline-1 w-[25em] mx-auto h-75 rounded-xl outline-black text-white">
    {label}
  </div>
);

const HomeCards = () => {
  const cards = [
    { label: "Study Smarter" },
    { label: "Track Progress" },
    { label: "Collaborate" },
  ];

  return (
    <div className="flex flex-col items-center gap-20 mt-60">
      {cards.map((card, i) => (
        <Card key={i} {...card} />
      ))}
    </div>
  );
};

export default HomeCards;
