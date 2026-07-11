import HomeCards from "./HomeCards";
import { Link } from "@tanstack/react-router";

const MainText = () => {
  return (
    <div className="mx-auto mt-18 max-w-6xl px-4 py-10 font-[Inter]">
      <div className="flex flex-col items-center text-center">
        <h1 className="max-w-2xl text-5xl leading-tight font-semibold">
          Notes and Flashcards{" "}
          <span className="text-[#015d67]">that Learn with You.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-xl text-[#737373]">
          Start studying faster by creating and organizing your own flashcards
          in seconds.
        </p>

        <Link
          to="/flashcards/create"
          className="mt-8 rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-[#222]"
        >
          Create Flashcards Now
        </Link>
      </div>

      <div className="mt-14">
        <HomeCards />
      </div>
    </div>
  );
};

export default MainText;
