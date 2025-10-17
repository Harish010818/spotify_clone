import { createContext, useContext, useState, type ReactNode } from "react";

const server = "http://localhost:3000";

export interface Song {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audio: string;
  album: string;
}

export interface album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SongContextType {
  songs: Song[];
}

const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
  children: ReactNode;
}

export const SongProivder: React.FC<SongProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);

  return (
    <SongContext.Provider value={{ songs }}>{children}</SongContext.Provider>
  );
};

export const useSong = (): SongContextType => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongData must be within a songProvider");
  }

  return context;
};
