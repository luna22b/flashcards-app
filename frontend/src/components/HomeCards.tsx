import {
  PlusCircleIcon,
  ChartBarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

type CardProps = {
  label: string;
  description: string;
  icon: React.ReactNode;
};

const Card = ({ label, description, icon }: CardProps) => (
  <div className="h-60 w-full rounded-2xl bg-white px-6 pt-6 text-center shadow-lg">
    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#ddd]">
      {icon}
    </div>

    <p className="mt-5 text-2xl font-semibold text-black">{label}</p>

    <p className="mt-4 text-[#545454]">{description}</p>
  </div>
);

const HomeCards = () => {
  const cards = [
    {
      label: "Create Flashcards",
      description:
        "Turn your notes into organized flashcards and build study sets in seconds.",
      icon: <PlusCircleIcon className="size-7" />,
    },
    {
      label: "Track Progress",
      description:
        "Keep your study material organized and see how your learning improves.",
      icon: <ChartBarIcon className="size-7" />,
    },
    {
      label: "Test Yourself",
      description:
        "Practice with quizzes to strengthen your memory and improve recall.",
      icon: <AcademicCapIcon className="size-7" />,
    },
  ];

  return (
    <div className="mt-45 bg-[#fcfcfc] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-semibold">
            Studying Made <span className="text-[#015d67]">Simple</span>
          </h2>

          <p className="text-xl text-[#545454]">
            Create flashcards, review your knowledge, and test yourself
          </p>

          <div className="mt-4 flex flex-col gap-4 lg:flex-row">
            {cards.map((card, i) => (
              <Card key={i} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
