import { useNavigate } from "react-router-dom";

interface AlbumCardProps {
  image: string;
  name: string;
  desc: string;
  id: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ image, name, desc, id }) => {
  const navigate = useNavigate();
   return (
    <div
      onClick={() => navigate("/album/" + id)}
      className="min-w-[180px] bg-[#181818] hover:bg-[#282828] transition-all duration-300 p-3 rounded-lg cursor-pointer"
    >
      <img
        src={image}
        alt={name}
        className="rounded-lg w-[160px] h-[160px] object-cover mb-3 shadow-md"
      />
      <p className="font-bold text-[15px] truncate">{name}</p>
      <p className="text-slate-400 text-sm truncate">{desc}</p>
    </div>
  );
};

export default AlbumCard;
