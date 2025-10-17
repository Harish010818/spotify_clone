import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            src="./left_arrow.png"
            alt=""
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <img
            src="./right_arrow.png"
            alt=""
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            onClick={() => navigate(+1)}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full mt-4 md:block hidden">
            Explore Premium
          </p>
          <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full mt-4 md:block hidden">
            Install App
          </p>
          <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full mt-4 md:block hidden">
            Logout
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          All
        </p>
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          Music
        </p>
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          Podcast
        </p>
        <p
          onClick={() => navigate("/playlist")}
          className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer md:hidden"
        >
          PlayList
        </p>
      </div>
    </>
  );
};

export default Navbar;
