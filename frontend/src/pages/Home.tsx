import AlbumCard from "../components/AlbumCard";
import Loader from "../components/Loader";
import SongCard from "../components/SongCard";
import { useSongData } from "../context/SongContext";
import Layout from "../Layout/Layout";

const Home = () => {
  const { albums, songs, loading } = useSongData();
  
  return (
    <div className="text-white">
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          {/* ===== Featured Charts Section ===== */}
          <section className="mb-10">
            <h1 className="my-5 font-bold text-3xl tracking-tight">Featured Charts</h1>
            <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-2">
              {albums && albums.length > 0 ? (
                albums.map((e, i) => (
                  <AlbumCard
                    key={i}
                    image={e.thumbnail}
                    name={e.title}
                    desc={e.description}
                    id={e.id}
                  />
                ))
              ) : (
                <p className="text-gray-400">No albums available</p>
              )}
            </div>
          </section>

          {/* ===== Today's Hits Section ===== */}
          <section>
            <h1 className="my-5 font-bold text-3xl tracking-tight">Today’s Biggest Hits</h1>
            <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-2">
              {songs && songs.length > 0 ? (
                songs.map((e, i) => (
                  <SongCard
                    key={i}
                    image={e.thumbnail}
                    name={e.title}
                    desc={e.description}
                    id={e.id}
                  />
                ))
              ) : (
                <p className="text-gray-400">No songs found</p>
              )}
            </div>
          </section>
        </Layout>
      )}
    </div>
  );
};

export default Home;
