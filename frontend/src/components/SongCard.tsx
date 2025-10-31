import { FaPlay } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { useUserData } from "../context/UserContext";
import { useSongData } from "../context/SongContext";

interface SongCardProps {
  image: string;
  name: string;
  desc: string;
  id: string;
}

const SongCard: React.FC<SongCardProps> = ({ image, name, desc, id }) => {
  const { addToPlaylist, isAuth } = useUserData();
  const { setSelectedSong, setIsPlaying } = useSongData();

  const saveToPlayListHandler = () => {
    addToPlaylist(id);
  };

  return (
    <div className="min-w-[180px] bg-[#181818] hover:bg-[#282828] transition-all duration-300 p-3 rounded-lg cursor-pointer">
      <div className="relative group">
        <img
          src={image}
          alt={name}
          className="rounded-lg w-[160px] h-[160px] object-cover shadow-md"
        />

        {/* Play + Save Buttons (hover visible) */}
        <button
          onClick={() => {
            setSelectedSong(id);
            setIsPlaying(true);
          }}
          className="absolute cursor-pointer bottom-3 right-14 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105"
        >
          <FaPlay />
        </button>

        {isAuth && (
          <button
            onClick={saveToPlayListHandler}
            className="absolute cursor-pointer bottom-3 right-3 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105"
          >
            <FaBookBookmark />
          </button>
        )}
      </div>

      <p className="font-bold text-[15px] mt-2 truncate">{name}</p>
      <p className="text-slate-400 text-sm truncate">{desc}</p>
    </div>
  );
};

export default SongCard;
