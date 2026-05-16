import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

import Navbar from "#/components/Navbar";
import MainText from "#/components/MainText";

function Home() {
  return (
    <div>
      <Navbar />
      <MainText />
    </div>
  );
}
