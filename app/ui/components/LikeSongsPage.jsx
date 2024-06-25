"use client";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";

const SongsCard = dynamic(() => import("./SongsCard"), { ssr: false });

export default function PlayList({ likeSongs }) {
  const [filterByUser, setFilterByUser] = useState(() => {
    const localValue = localStorage.getItem("AUTH");
    if (localValue == null) {
      return [];
    } else {
      const auth = JSON.parse(localValue);
      return likeSongs.filter((song) => song.user_id === auth[0].id);
    }
  });
  const [filterSongs, setFilterSongs] = useState(filterByUser);

  const searchHandler = (e) => {
    const searchString = e.target.value.toLowerCase();
    setFilterSongs(() => {
      return filterByUser.filter(
        (song) =>
          song.title.toLowerCase().includes(searchString) ||
          song.artist.toLowerCase().includes(searchString)
      );
    });
  };
  return (
    <div className="h-[100vh] bg-secondary px-10 py-5 grid grid-rows-12 gap-2">
      <div className="row-span-1 grid grid-cols-12 px-2 gap-2">
        <h2 className="col-span-6 bg-gradient-to-r from-green-800 to-palette_one rounded-md flex justify-center items-center">
          <span className="text-xl">My Like Songs</span>
        </h2>
        <div className="col-span-6 flex justify-center items-center">
          <Search searchHandler={searchHandler} />
        </div>
      </div>
      <div className="row-span-11 all-songs grid grid-cols-12 gap-2 h-[75vh] px-2 py-2 overflow-y-scroll scrollbar">
        {filterSongs.map((song, idx) => {
          return (
            <SongsCard
              key={song.id}
              filterSongs={filterSongs}
              song={song}
              idx={idx}
            />
          );
        })}
      </div>
    </div>
  );
}
