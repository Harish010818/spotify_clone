import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";


export interface Song {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audio: string;
  album: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SongContextType {
  albums: Album[];
  songs: Song[];
  song: Song | null;
  isPlaying: boolean;
  loading: boolean;
  selectedSong: string | null;
  setIsPlaying: (value: boolean) => void;
  setSelectedSong: (id: string) => void;
  setLoading: (value: boolean) => void;
  fetchSingleSong: () => Promise<void>;
  prevSong: () => void;
  nextSong: () => void;
  albumSong: Song[];
  albumData: Album | null;
  fetchAlbumsongs: (id: string) => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
  children: ReactNode;
}

export const SongProivder: React.FC<SongProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Album[]>([]);
  
  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Song[]>(
        `${import.meta.env.VITE_SONG_SERVICE_API_URL}/api/v1/user/song/all`
      );

      setSongs(data);
      if (data.length > 0)setSelectedSong(data[0].id.toString());
      setIsPlaying(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Album[]>(
        `${import.meta.env.VITE_SONG_SERVICE_API_URL}/api/v1/user/album/all`
      );

      setAlbums(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSingleSong = useCallback(async () => {
    if (!selectedSong) return;
    try {
      const { data } = await axios.get<Song>(
        `${import.meta.env.VITE_SONG_SERVICE_API_URL}/api/v1/user/song/${selectedSong}`
      );
      console.log("data ye aara hai",  data);
      setSong(data);
    } catch (error) {
      console.error(error);
    }
  }, [selectedSong]);

  const [index, setIndex] = useState<number>(0);

  const nextSong = useCallback(() => {
    if (index === songs.length - 1) {
      setIndex(0);
      setSelectedSong(songs[0]?.id.toString());
    } else {
      setIndex((prev) => prev + 1);
      setSelectedSong(songs[index + 1]?.id.toString());
    }
  }, [index, songs]);

  const prevSong = useCallback(() => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setSelectedSong(songs[index - 1]?.id.toString());
    }
  }, [index, songs]);

  const [albumSong, setAlbumSong] = useState<Song[]>([]);
  const [albumData, setAlbumData] = useState<Album | null>(null);

  const fetchAlbumsongs = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<{ songs: Song[]; album: Album }>(
        `${import.meta.env.VITE_SONG_SERVICE_API_URL}/api/v1/user/album/${id}`
      );

      setAlbumData(data.album);
      setAlbumSong(data.songs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  return (
    <SongContext.Provider
      value={{
        albums,
        songs,
        song,
        loading,
        isPlaying,
        setLoading,
        setIsPlaying,
        selectedSong,
        setSelectedSong,
        fetchSingleSong,
        prevSong,
        nextSong,
        fetchAlbumsongs,
        albumData,
        albumSong,
        fetchSongs,
        fetchAlbums,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongData = (): SongContextType => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongData must be within a songProvider");
  }

  return context;
};
