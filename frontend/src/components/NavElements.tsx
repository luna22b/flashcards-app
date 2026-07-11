import { Link } from "@tanstack/react-router";
import { useAuthQuery } from "#/utils/useAuthQuery";

type Props = {
  onLogout: () => void;
};

const NavElements = ({ onLogout }: Props) => {
  const { data: user } = useAuthQuery();

  return (
    <div>
      {user ? (
        <button
          onClick={onLogout}
          className="bg-[#015d67] text-white w-18 h-10 rounded-xl cursor-pointer border border-black"
        >
          Logout
        </button>
      ) : (
        <div>
          <button className="cursor-pointer bg-[#262626] text-white rounded-lg px-4 py-2 ml-2">
            <Link to="/login">Sign in</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default NavElements;
