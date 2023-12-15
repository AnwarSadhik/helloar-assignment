import React, { useState } from "react";
import { TrashIcon, PlayIcon } from "../utils/constants";
import { MusicPlayer } from "./MusicPlayer";
import { useGlobalCtx } from "../context/global";

export default function MusicCard() {
  const {
    currentlyPlaying,
    musicData,
    playSong,
    handleDelete,
  } = useGlobalCtx();

  console.log(currentlyPlaying)

  return (
    <>
      {musicData?.map((music, index) => (
        <section key={index}>
          <div
            className="flex justify-between items-center max-w-[1440px]"
            // key={index}
          >
            <div className="flex items-center space-x-4 py-2 mx-4">
              <img
                src={music.thumbnail}
                alt="thumbnail"
                className="h-[75px] w-[75px]"
              />
              <h2>{music.name}</h2>
            </div>
            <div>{music.source}</div>
            <div>
              <h2>{music.dateAdded}</h2>
            </div>
            <div className="flex items-center space-x-[5vw]">
              <span
                className="cursor-pointer"
                onClick={() => playSong(index)}
              >
                <PlayIcon />
              </span>
              <span className="cursor-pointer" onClick={() => handleDelete(index)}>
                <TrashIcon />
              </span>
            </div>
          </div>
          <div className="border-b max-w-[94%] mx-4"></div>
        </section>
      ))}
    <div>
  {currentlyPlaying !== undefined && <MusicPlayer nowPlaying={currentlyPlaying}/> }
</div>
    </>
  );
}
