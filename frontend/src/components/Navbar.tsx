import { useNavigate } from "@tanstack/react-router";
import { logout } from "#/api/auth";
import { useQueryClient } from "@tanstack/react-query";
import { Bars3Icon } from "@heroicons/react/24/solid";
import NavElements from "./NavElements";

const Navbar = () => {
  // used queries to check if the user is logged out or not. if they are, display the login button.
  // if they are not logged out, display the log out button
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    await queryClient.invalidateQueries({
      queryKey: ["auth"],
    });

    navigate({ to: "/login" });
  };

  const handleClick = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="border-b border-b-[#ddd]">
      <div className="h-20 flex justify-between items-center max-w-[85em] mx-auto px-3">
        <div className="flex gap-5">
          <div
            className="font-semibold text-black cursor-pointer"
            onClick={handleClick}
          >
            Study
          </div>
        </div>
        <div>
          <Bars3Icon className="sm:hidden size-6" />
          <div className="hidden sm:flex gap-4">
            <NavElements onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
