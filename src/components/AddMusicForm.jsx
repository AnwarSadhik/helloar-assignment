import React, { useState } from "react";
import { useGlobalCtx } from "../context/global";

export default function AddMusicForm({ toggleAddMusic }) {
  const [formData, setFormData] = useState({
    name: "",
    thumbnail: "",
    source: "",
    link: "",
  });
  const { 
    musicData,
    setMusicData,
  } = useGlobalCtx();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddMusic = (e) => {
    e.preventDefault();

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yy = String(today.getFullYear()).slice(-2);

    const currentDate = `${dd}/${mm}/${yy}`;

    const isVideoLink = /\.(mp3|mp4)$/i.test(formData.link);

    const isImageLink = /\.(jpeg|jpg|png)$/i.test(formData.thumbnail);

    if (!isVideoLink || !isImageLink) {
      alert("Invalid link or thumbnail format");
      return;
    }

    const newMusicData = {
      ...formData,
      dateAdded: currentDate,
    };
    
    setMusicData([...musicData, newMusicData]);
  
  
  setFormData({
    name: "",
    thumbnail: "",
    source: "",
    link: "",
  });
  };

  console.log(formData);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
      <div className="bg-white p-6 rounded-md shadow-md z-50 w-1/2">
        <span className="absolute top-0 right-0 p-2 cursor-pointer">
          &times;
        </span>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Add Song</h2>
          <span
            className="mb-4 font-bold cursor-pointer"
            onClick={toggleAddMusic}
          >
            X
          </span>
        </div>
        <div className="border-b w-full"></div>
        <form className="space-y-4 mt-2">
          <div className="flex flex-col space-y-2">
            <label className="mb-1">Song Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Song Name"
              className="border rounded-md px-3 py-2"
            />
            <label className="mb-1">Song Link:</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="mp3 | mp4 formats supported"
              className="border rounded-md px-3 py-2"
            />
            <label className="text-xs px-2 cursor-text">
            Example : 
            https://aac.saavncdn.com/533/a60f6df409cc9104eaa2a65a1428f38b_48.mp4
            </label>
            <label className="mb-1">Song Source:</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              placeholder="Song Source"
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2"
            />
            <label className="mb-1">Song Thumbail:</label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              placeholder="jpeg | jpg | png formats supported"
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2"
            />
            <label className="text-xs px-2 cursor-text">
              Example:
              https://c.saavncdn.com/533/UNDERTALE-Soundtrack-Unknown-2015-20200818183620-150x150.jpg
            </label>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={toggleAddMusic}
              className=" border text-black font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleAddMusic}
              className="bg-blue-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
