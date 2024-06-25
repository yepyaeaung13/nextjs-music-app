"use client";
import React, { useState } from "react";
import Search from "./Search";
import dynamic from "next/dynamic";

const SongsCard = dynamic(() => import("./SongsCard"), { ssr: false });

const SongsPage = ({ songs }) => {
  const [filterSongs, setFilterSongs] = useState(songs);
  const searchHandler = (e) => {
    const searchString = e.target.value.toLowerCase();
    setFilterSongs(() => {
      return songs.filter((song) =>
        song.title.toLowerCase().includes(searchString)
      );
    });
  };
  return (
    <>
      <div className="flex justify-center mb-8">
        <Search searchHandler={searchHandler} />
      </div>
      <div className="all-songs grid grid-cols-12 gap-2 h-[75vh] px-2 overflow-y-scroll scrollbar">
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
    </>
  );
};

export default SongsPage;
