import React, { useState } from "react";
import AddMusicForm from "./AddMusicForm";

export default function Header() {
  const [showAddMusic, setShowAddMusic] = useState(false);

  const toggleAddMusic = () => {
    setShowAddMusic(prev => !prev);
  };

  return (
    <>
      {showAddMusic && <AddMusicForm toggleAddMusic={toggleAddMusic}/>}
      <main className="w-full">
        <div className="p-4 mx-4">
          <h3 className="text-neutral-600/60 text-sm">
            First-level Menu / Second-level Menu /{" "}
            <span className="text-black">Current Page</span>
          </h3>
          <div className="flex justify-between items-center mt-4">
            <h3 className="text-2xl font-medium">Songs</h3>
            <button
              className="bg-secondary py-2 px-6 rounded-md"
              onClick={toggleAddMusic}
            >
              Add Songs
            </button>
          </div>
        </div>
        <div className="border-b w-full mt-2"></div>
        <div className="mx-8 p-7 font-medium">
          <div className="flex justify-start items-center space-x-[18vw]">
            <h2>SONG NAME</h2>
            <h2>SOURCE</h2>
            <h2>ADDED ON</h2>
          </div>
          <div className="border-b mt-8 relative right-8"></div>
        </div>
      </main>
    </>
  );
}
