import { useEffect, useRef, useState } from "react";
import { useSongData } from "../context/SongContext";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa6";

const Player = () => {
  const {
    song,
    nextSong,
    isPlaying,
    prevSong,
    fetchSingleSong,
    setIsPlaying,
    selectedSong,
  } = useSongData();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleLoadedMetaData);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleLoadedMetaData);
    };
  }, [song]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)/100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const durationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
  };

  return (
    <div>
      {song && (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
          <div className="lg:flex item-center gap-4">
            <img src="" className="w-12" alt="" />
            <div className="hidden md:block">
              <p>{song.title}</p>
              <p>{song.description?.slice(0, 30)}...</p>
            </div>
            <div className="flex flex-col items-center gap-1 m-auto">
              {song.audio && (
                <audio ref={audioRef} src={song.audio} autoPlay={isPlaying} />
              )}
              <div className="w-full flex items-center font-thin text-green-400">
                <input
                  type="range"
                  min={"0"}
                  max={"100"}
                  className="progress-bar w-[120x] md:w-[300px]"
                  value={(progress / duration) * 100 || 0}
                  onChange={durationChange}
                />
              </div>
              <div className="flex justify-center items-center gap-4">
                <span className="cursor-pointer" onClick={prevSong}>
                  <GrChapterPrevious />
                </span>
                <button
                  className="bg-white text-black rounded-full p-2"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <span className="cursor-pointer" onClick={nextSong}>
                  <GrChapterNext />  
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
              <input
                 type="range"
                 className="w-16 mid:w-12"
                 min={"0"}
                 max={"100"}
                 step={"0.01"}
                 value={volume*100}
                 onChange={volumeChange}  
              />      
          </div> 
        </div>
      )}
    </div>
  );
};

export default Player;
