import { useState, useEffect, useRef } from "react";
import { data } from "../utils/_data";
import { PlayIcon, PauseIcon, NextIcon, PrevIcon } from "../utils/constants";
import { useGlobalCtx } from "../context/global";

export const MusicPlayer = ({ nowPlaying }) => {
  const { musicData } = useGlobalCtx();
  const [currentSongIndex, setCurrentSongIndex] = useState(nowPlaying);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  const currentSong = musicData[currentSongIndex];
  console.log(nowPlaying)

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.link;
      if (isPlaying) {
        audioRef.current?.play().catch((error) => {
          console.error("Audio playback error:", error);
        });
      } else {
        audioRef.current?.pause();
      }
    }
  }, [currentSong, isPlaying, currentSongIndex]);

  const handleProgress = (e) => {
    const audio = audioRef.current;
    const newProgress = +e.target.value;

    if (isPlaying) {
      audio.pause();
      audio.currentTime = (newProgress / 100) * audio.duration;
      audio.play().catch((error) => {
        console.error("Audio playback error:", error);
      });
    } else {
      audio.currentTime = (newProgress / 100) * audio.duration;
    }

    setProgress(newProgress);
  };

  let storedTime = 0;

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (!isPlaying) {
      storedTime = audio.currentTime;
      audio.play().catch((error) => {
        console.error("Audio playback error:", error);
      });
    } else {
      audio.pause();
    }

    setIsPlaying(!isPlaying);
    audio.currentTime = storedTime;
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % data.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
    setProgress(0);
  };

  useEffect(() => {
    setCurrentSongIndex(nowPlaying);
  }, [nowPlaying]);

  return (
    <div className="w-full h-20 absolute bottom-3">
      <input
        type="range"
        value={progress}
        onChange={handleProgress}
        step="0.01"
        className="w-full"
      />

      <section className="flex items-center space-x-3">
        {currentSong && (
          <div className="flex items-center space-x-3 ml-4">
            <img
              src={currentSong.thumbnail}
              alt="thumbnail"
              className="h-[60px] w-[60px] object-contain"
            />
            <h2 className="text-lg">{currentSong.name}</h2>
          </div>
        )}

        <div className="flex items-center space-x-2 absolute right-[22rem]">
          <span onClick={handlePrev} className="cursor-pointer">
            <PrevIcon />
          </span>
          <span onClick={handlePlayPause} className="cursor-pointer">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </span>
          <span onClick={handleNext} className="cursor-pointer">
            <NextIcon />
          </span>
        </div>
      </section>
    </div>
  );
};
