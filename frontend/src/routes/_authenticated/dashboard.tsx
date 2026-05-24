import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext() as { user: { username: string } };

  return (
    <div>
      <Navbar />
      <div>hello {user.username}!</div>
      <div>
        These are all your flashcards! To make a new flashcard, create a new set
        below!
      </div>
      <button
        onClick={() => navigate({ to: "/flashcards" })}
        className="text-white bg-black rounded-xl mt-50 ml-50 cursor-pointer"
      >
        Create a new set
      </button>
    </div>
  );
}
