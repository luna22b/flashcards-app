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
  );
};

export default NavElements;
