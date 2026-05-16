import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <div className="border-b border-b-[#ddd]">
      <div className="h-20 flex justify-between items-center max-w-[90em] px-10 mx-auto">
        <div className="flex gap-5">
          <div className="font-semibold text-black">Study</div>
        </div>
        <div className="hidden sm:flex gap-4">
          <button className="bg-[#015d67] text-white w-18 h-10 rounded-xl cursor-pointer">
            <Link to="/login">Log in</Link>
          </button>
          <button className="bg-black text-white w-18 h-10 rounded-xl cursor-pointer">
            <Link to="/signup">Sign up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
