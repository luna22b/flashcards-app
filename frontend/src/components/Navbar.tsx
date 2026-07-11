import { useNavigate } from "@tanstack/react-router";
import { logout } from "#/api/auth";
import { useQueryClient } from "@tanstack/react-query";
import NavElements from "./NavElements";
import { Sprout } from "lucide-react";

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

    navigate({ to: "/" });
  };

  const handleClick = () => {
    navigate({ to: "/" });
  };

  return (
    <nav>
      <div className="max-w-6xl mx-auto border-b border-b-[#e0e0e0] pb-4 px-4 py-6 flex justify-between items-center">
        <div className="flex gap-5">
          <div
            className="text-xl cursor-pointer font-semibold flex gap-3 items-center"
            onClick={handleClick}
          >
            <Sprout />
            luma
          </div>
        </div>
        <div>
          <div className="sm:flex gap-4">
            <NavElements onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
