import { createFileRoute, redirect } from "@tanstack/react-router";
import { getMe } from "#/api/auth";

import Navbar from "#/components/Navbar";
import MainText from "#/components/MainText";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const user = await getMe();

    if (user) {
      throw redirect({
        to: "/flashcards",
      });
    }
  },

  component: Home,
});

function Home() {
  return (
    <div>
      <Navbar />
      <MainText />
    </div>
  );
}
