import { useNavigate } from "react-router-dom";
import Playlistcard from "./Playlistcard";
import { useUserData } from "../context/UserContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useUserData();
  return (
    <div
      className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden 
    lg:flex"
    >
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          className="flex item-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="./home.png" alt="" className="w-6" />
          <p className="font-bold">Home</p>
        </div>
        <div
          className="flex item-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="./search.png" alt="" className="w-6" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      <div className="bg-[#121212]  h-[85%] rounded">
        <div className="p-4 flex item-center justify-between">
          <div>
            <img src="/stack.png" className="w-8" alt="" />
            <p className="font-semibold">Your Library</p>
          </div>

          <div className="flex items-center gap-3">
            <img src="./arrow.png" className="w-8" alt="" />
            <img src="./plus.png" className="w-8" alt="" />
          </div>
        </div>

        <div onClick={() => navigate("/playlist")}>
          <Playlistcard />
        </div>
        <div className="m-2 p-4 bg-[#121212] rounded font-semibold flex flex-col items-start gap-1 pl-4 mt-4">
          <h1>Let's find some podcast to follow</h1>
          <p className="font-light">We'll keep you update on new episoded</p>
          <button className="px-4 py-1.5 bg-green-600 text-black text-[15px] rounded-full mt-4 cursor-pointer">
            Browse Podcasts
          </button>
        </div>
        {user && user.role === "admin" && (
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-1.5 bg-green-600 text-black text-[15px] rounded-full mt-4 cursor-pointer"
          >
            Admin panel
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
