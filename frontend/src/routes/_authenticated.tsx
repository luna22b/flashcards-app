import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { getMe } from "#/api/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const user = await getMe();

    if (!user) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    return { user };
  },
  component: () => <Outlet />,
});
