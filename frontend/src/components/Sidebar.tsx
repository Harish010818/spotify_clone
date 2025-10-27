import { useNavigate } from "react-router-dom";
import Playlistcard from "./Playlistcard";
import { useUserData } from "../context/UserContext";
import { FaSpotify } from "react-icons/fa6";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useUserData();
  console.log(user);

  return (
    <div className="hidden lg:flex flex-col w-[25%] h-full p-2 text-white bg-[#000000]">
      {/* ===== Spotify Logo Section ===== */}
      <div className="bg-[#121212] rounded-xl p-6 flex flex-col gap-4 items-start justify-center">
        <div
          className="flex items-center gap-3 cursor-pointer w-full justify-center"
          onClick={() => navigate("/")}
        >
          <FaSpotify size={40} className="text-[#1DB954]"/>
        </div>
      </div>

      {/* ===== Navigation Section ===== */}
      <div className="bg-[#121212] rounded-xl mt-2 flex flex-col py-4 gap-1">
        <div
          className="flex items-center gap-4 px-6 py-2 cursor-pointer hover:text-[#1DB954] transition-all duration-300"
          onClick={() => navigate("/")}
        >
          <img src="/home.png" alt="Home" className="w-6 opacity-80" />
          <p className="font-semibold text-sm">Home</p>
        </div>

        <div
          className="flex items-center gap-4 px-6 py-2 cursor-pointer hover:text-[#1DB954] transition-all duration-300"
          onClick={() => navigate("/search")}
        >
          <img src="/search.png" alt="Search" className="w-6 opacity-80" />
          <p className="font-semibold text-sm">Search</p>
        </div>
      </div>

      {/* ===== Library Section ===== */}
      <div className="bg-[#121212] rounded-xl mt-2 flex-1 flex flex-col overflow-y-auto hide-scrollbar">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#282828]">
          <div className="flex items-center gap-3">
            <img src="/stack.png" className="w-6 opacity-80" alt="Library" />
            <p className="font-semibold text-sm">Your Library</p>
          </div>
          <div className="flex items-center gap-2">
            <img src="/plus.png" className="w-5 cursor-pointer hover:opacity-80" alt="Add" />
            <img src="/arrow.png" className="w-5 cursor-pointer hover:opacity-80" alt="Arrow" />
          </div>
        </div>

        <div className="px-3 py-2" onClick={() => navigate("/playlist")}>
          <Playlistcard />
        </div>

        {/* ===== Podcast Section ===== */}
        <div className="m-3 p-4 bg-gradient-to-b from-[#1f1f1f] to-[#121212] rounded-xl font-semibold flex flex-col items-start gap-1">
          <h1 className="text-[15px] font-semibold">
            Let’s find some podcasts to follow
          </h1>
          <p className="text-sm font-light text-gray-400">
            We’ll keep you updated on new episodes.
          </p>
          <button className="px-4 py-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-black text-[14px] font-semibold rounded-full mt-4 transition-all duration-300">
            Browse Podcasts
          </button>
        </div>

        {/* ===== Admin Panel Button ===== */}
        {user && user.role === "admin" && (
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="mx-4 my-4 px-4 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-black text-[15px] font-semibold rounded-full cursor-pointer transition-all duration-200 shadow-lg hover:shadow-[#1db954]/40"
          >
            Admin Panel
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
