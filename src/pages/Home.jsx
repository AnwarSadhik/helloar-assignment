import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// import Hero from "../components/Hero";
import MusicCard from "../components/MusicCard";
import { Navigate } from "react-router-dom";

export default function Home() {
  const auth = sessionStorage?.getItem("otpVerified");

  if (!auth) {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex w-full">
      <Sidebar />
      <div className="flex flex-col w-full">
      <Header />
        <MusicCard />
      </div>
    </main>
  );
}
