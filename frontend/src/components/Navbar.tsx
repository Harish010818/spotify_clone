import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, logoutUser } = useUserData();

  const logoutHandler = () => {
    logoutUser(navigate);
  };

  return (
    <>
      {/* ===== Top Navbar ===== */}
      <div className="w-full flex justify-between items-center py-3 px-2 md:px-4 font-semibold text-white">
        {/* === Arrows === */}
        <div className="flex items-center gap-2">
          <img
            src="/left_arrow.png"
            alt=""
            className="w-8 bg-black p-2 rounded-full cursor-pointer  hover:shadow-lg hover:scale-100 
  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
  hover:text-black  hover:bg-gray-600"
            onClick={() => navigate(-1)}
          />
          <img
            src="/right_arrow.png"
            alt=""
            className="w-8 bg-black p-2 rounded-full cursor-pointer  hover:shadow-lg hover:scale-100 
  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
  hover:text-black  hover:bg-gray-600"
            onClick={() => navigate(+1)}
          />
        </div>

        {/* === Buttons === */}
        <div className="flex items-center gap-3">
          <p
            className="hidden md:block px-5 py-2 cursor-pointer bg-white 
  text-black text-[15px] rounded-full shadow-md 
  hover:shadow-lg hover:scale-105 
  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
  hover:text-black hover:bg-gradient-to-r hover:from-white hover:to-gray-100"
          >
            Explore Premium
          </p>
          <p
            className="hidden md:block px-5 py-2 cursor-pointer bg-white 
  text-black text-[15px] rounded-full shadow-md 
  hover:shadow-lg hover:scale-105 
  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
  hover:text-black hover:bg-gradient-to-r hover:from-white hover:to-gray-100"
          >
            Install App
          </p>

          {isAuth ? (
            <p
              onClick={logoutHandler}
              className="hidden md:block px-5 py-2 cursor-pointer bg-white 
  text-black text-[15px] rounded-full shadow-md 
  hover:shadow-lg hover:scale-105 
  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
  hover:text-black hover:bg-gradient-to-r hover:from-white hover:to-gray-100"
            >
              Logout
            </p>
          ) : (
            <p
              onClick={() => navigate("/login")}
              className="hidden md:block px-5 py-2 cursor-pointer bg-white 
  text-black text-[15px] rounded-full shadow-md 
  hover:shadow-lg hover:scale-105 
  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
  hover:text-black hover:bg-gradient-to-r hover:from-white hover:to-gray-100"
            >
              Login
            </p>
          )}
        </div>
      </div>

      {/* ===== Filter Tabs ===== */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {["All", "Music", "Podcast"].map((tab) => (
          <p
            key={tab}
            className="hidden md:block px-5 py-2 cursor-pointer bg-white 
  text-black text-[15px] rounded-full shadow-md 
  hover:shadow-lg hover:scale-105 
  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
  hover:text-black hover:bg-gradient-to-r hover:from-white hover:to-gray-100"
          >
            {tab}
          </p>
        ))}

        {/* Mobile Playlist Button */}
        <p
          onClick={() => navigate("/playlist")}
          className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer md:hidden hover:bg-[#1DB954] hover:text-black transition-all"
        >
          Playlist
        </p>
      </div>
    </>
  );
};

export default Navbar;
