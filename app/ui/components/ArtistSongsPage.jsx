"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Search from "./Search";
import dynamic from "next/dynamic";

const SongsCard = dynamic(() => import("./SongsCard"), { ssr: false });

const ArtistSongsPage = ({ songs }) => {
  const searchParam = useSearchParams();
  const artistName = searchParam.get("name");
  const [artistSongs, setArtistSongs] = useState(() => {
    return songs.filter((song) =>
      song.artist.toLowerCase().includes(searchParam.get("name").toLowerCase())
    );
  });

  const [filterSongs, setFilterSongs] = useState(artistSongs);

  const searchHandler = (e) => {
    const searchString = e.target.value.toLowerCase();
    setFilterSongs(() => {
      return artistSongs.filter((song) =>
        song.title.toLowerCase().includes(searchString)
      );
    });
  };
  return (
    <>
      <div className="row-span-2 grid grid-cols-12 px-2 gap-2">
        <h2 className="col-span-6 bg-gradient-to-r from-green-800 to-palette_one rounded-md flex justify-center items-center">
          <span className="text-xl">{artistName}</span>
        </h2>
        <div className="col-span-6 flex justify-center items-center">
          <Search searchHandler={searchHandler} />
        </div>
      </div>
      <div className="artist-songs row-span-9 grid grid-cols-12 px-2 gap-3 overflow-y-scroll scrollbar">
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

export default ArtistSongsPage;
