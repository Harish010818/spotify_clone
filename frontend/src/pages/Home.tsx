import AlbumCard from "../components/AlbumCard";
import Loader from "../components/Loader";
import SongCard from "../components/SongCard";
import { useSongData } from "../context/SongContext";
import Layout from "../Layout/Layout";

const Home = () => {
  const { albums, songs, loading } = useSongData();
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
            <div className="flex overflow-auto">
              {albums?.map((e, i) => (
                <AlbumCard
                  key={i}
                  image={e.thumbnail}
                  name={e.title}
                  desc={e.description}
                  id={e.id}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
            <div className="flex overflow-auto">
              {songs?.map((e, i) => (
                <SongCard
                  key={i}
                  image={e.thumbnail}
                  name={e.title}
                  desc={e.description}
                  id={e.id}
                />
              ))}
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
};

export default Home;
