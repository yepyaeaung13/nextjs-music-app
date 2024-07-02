"use client";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import dynamic from "next/dynamic";

const SongsCard = dynamic(() => import("./SongsCard"), { ssr: false });

export default function PlayList() {
  const [auth, setAuth] = useState(() => {
    const localValue = localStorage.getItem("AUTH");
    if (localValue == null) {
      return [];
    }
    return JSON.parse(localValue);
  });

  const [filterSongs, setFilterSongs] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/like-songs?id=${auth.id}`)
      .then((res) => res.json())
      .then((data) => setFilterSongs(data))
      .catch((err) => console.error(err));
  }, []);

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

  const removeLikeSongsHandler = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-like-songs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.delete == true) {
          setFilterSongs((currentSongs) => {
            return currentSongs.filter((song) => song.id !== id);
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="h-[100vh] w-full bg-secondary md:px-10 px-2 md:py-5 py-2 grid grid-rows-12 gap-2">
      <div className="md:row-span-1 grid md:grid-cols-12 grid-cols-1 px-2 gap-2">
        <h2 className="md:col-span-6 bg-gradient-to-r from-green-800 to-palette_one rounded-md flex justify-center items-center">
          <span className="text-xl">My Like Songs</span>
        </h2>
        <div className="md:col-span-6 flex justify-center items-center">
          <Search searchHandler={searchHandler} />
        </div>
      </div>
      <div className="md:row-span-11 all-songs grid md:grid-cols-12 grid-cols-1 gap-2 h-[75vh] px-2 py-2 overflow-y-scroll scrollbar pt-5">
        {filterSongs.map((song, idx) => {
          return (
            <SongsCard
              key={song.id}
              filterSongs={filterSongs}
              song={song}
              idx={idx}
              removeLikeSongsHandler={removeLikeSongsHandler}
            />
          );
        })}
      </div>
    </div>
  );
}
