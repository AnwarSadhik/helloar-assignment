import React, { useState } from "react";
import { data } from "../utils/_data";

export const globalCtx = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    const [musicData, setMusicData] = useState(data);

    const login = () => {
      sessionStorage.setItem("otpVerified", true);
    };
  
    const logout = () => {
      sessionStorage.removeItem("otpVerified");
    };

    const handleDelete = (index) => {
      const updatedData = [...musicData];
      updatedData.splice(index, 1);
      setMusicData(updatedData);
    };
  
    const playSong = (index) => {
      setCurrentlyPlaying(index);
    };
    
 

    return <globalCtx.Provider value={{
            currentlyPlaying,
            setCurrentlyPlaying,
            musicData,
            setMusicData,
            playSong,
            handleDelete,
            login,
            logout,
    }}>
        {children}
    </globalCtx.Provider>
}

export const useGlobalCtx = () => {
    return React.useContext(globalCtx);
}