import { useEffect, useRef, useState } from "react";
import { useSongData } from "../context/SongContext";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";
import { FaPlay, FaPause, FaHeart, FaDesktop } from "react-icons/fa";
import { FiRepeat, FiMic, FiMaximize2 } from "react-icons/fi";
import { MdQueueMusic } from "react-icons/md";
import { BiShuffle } from "react-icons/bi";
import { HiVolumeUp } from "react-icons/hi";
import { PiSpeakerSimpleHighBold } from "react-icons/pi"; 


const Player =  () => {
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
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
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
   
  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  console.log(song);  
  return (
  <div>
    {song && (
      <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-[#121212] text-white flex justify-between items-center px-4 border-t border-gray-800 shadow-lg">
        
        {/* Left Section - Song Info */}
        <div className="flex items-center gap-4 w-[30%]">
          <img
              src={song.thumbnail ? song.thumbnail : "/download.jpeg"}
              className="w-12"
              alt=""
            />
          <div className="hidden md:block">
            <p className="font-semibold text-sm">{song.title}</p>
            <p className="text-xs text-gray-400">
              {song.description?.slice(0, 35)}...
            </p>
          </div>
          <div className="flex items-center gap-2 ml-3 text-gray-400">
            <FaHeart className="cursor-pointer hover:text-green-500 transition" />
            <PiSpeakerSimpleHighBold className="cursor-pointer hover:text-green-500 transition" />
          </div>
        </div>

        {/* Middle Section - Player Controls */}
        <div className="flex flex-col items-center justify-center w-[40%]">
          <div className="flex items-center justify-center gap-6 text-xl mb-2">
            <BiShuffle className="cursor-pointer hover:text-green-400 transition" />
            <span className="cursor-pointer" onClick={prevSong}>
              <GrChapterPrevious />
            </span>
            <button
              className="bg-white text-black rounded-full p-3 hover:scale-105 transition"
              onClick={handlePlayPause}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <span className="cursor-pointer" onClick={nextSong}>
              <GrChapterNext />
            </span>
            <FiRepeat className="cursor-pointer hover:text-green-400 transition" />
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full text-xs text-gray-400">
            {song.audio && (
              <audio ref={audioRef} src={song.audio} autoPlay={isPlaying} />
            )}
            {/*<span>{Math.floor(progress / 100)}:{(progress % 100).toString().padStart(2, "0")}</span>*/}
            <input
              type="range"
              min="0"
              max="100"
              value={(progress / duration) * 100 || 0}
              onChange={durationChange}
              className="progress-bar w-full h-1 bg-gray-600 rounded-lg cursor-pointer accent-green-500"
            />
            {/*<span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, "0")}</span>*/}
          </div>
        </div>
        {/* Right Section - Volume & Extras */}
        <div className="flex items-center gap-4 w-[25%] justify-end text-gray-400">
          <FiMic className="cursor-pointer hover:text-green-500 transition" />
          <MdQueueMusic className="cursor-pointer hover:text-green-500 transition" />
          <FaDesktop className="cursor-pointer hover:text-green-500 transition" />
          
          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <HiVolumeUp className="text-lg" />
            <input
              type="range"
              min="0"
              max="100"
              step="0.01"
              value={volume * 100}
              onChange={volumeChange}
              className="w-24 accent-green-500 cursor-pointer"
            />
          </div>

          <FiMaximize2 className="cursor-pointer hover:text-green-500 transition" />
        </div>
      </div>
    )}
  </div>
);

};

export default Player;
