import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext() as { user: { username: string } };

  return (
    <div>
      <Navbar />
      <div>hello {user.username}!</div>
    </div>
  );
}
