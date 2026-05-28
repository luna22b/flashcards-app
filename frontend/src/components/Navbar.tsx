import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthQuery } from "#/utils/useAuthQuery";
import { logout } from "#/api/auth";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  // used queries to check if the user is logged out or not. if they are, display the login button.
  // if they are not logged out, display the log out button
  const queryClient = useQueryClient();
  const { data: user } = useAuthQuery();
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

        <div className="hidden sm:flex gap-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-[#015d67] text-white w-18 h-10 rounded-xl cursor-pointer border border-black"
            >
              Logout
            </button>
          ) : (
            <>
              <button className="bg-[#015d67] text-white w-18 h-10 rounded-xl cursor-pointer border border-black">
                <Link to="/login">Log in</Link>
              </button>

              <button className="bg-black text-white w-18 h-10 rounded-xl cursor-pointer border border-black">
                <Link to="/signup">Sign up</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
