"use client";
import Link from "next/link";
import React, { useState } from "react";
import Search from "../ui/components/Search";

export default function page() {
  const [artists, setArtists] = useState([
    { id: 1001, artistName: "Bunny Phyo" },
    { id: 1002, artistName: "Aung Myint Myat" },
    { id: 1003, artistName: "Nora" },
    { id: 1004, artistName: "Poe Phyu Phyu" },
    { id: 1005, artistName: "SHINE" },
    { id: 1006, artistName: "MTHREE" },
    { id: 1007, artistName: "Nay Min Eain" },
    { id: 1008, artistName: "Amera Hpone" },
    { id: 1009, artistName: "Bobby Soxer" },
  ]);
  const [artistFilter, setArtistFilter] = useState(artists);

  const searchHandler = (e) => {
    const searchString = e.target.value.toLowerCase();
    setArtistFilter(() => {
      return artists.filter((artist) =>
        artist.artistName.toLowerCase().includes(searchString)
      );
    });
  };

  return (
    <div className="h-[100vh] bg-secondary px-10 py-5">
      <div className="flex justify-center mb-8">
        <Search searchHandler={searchHandler} />
      </div>
      <div className="grid grid-cols-12 gap-5 h-[75vh] px-6 overflow-y-scroll scrollbar">
        {artistFilter.map((artist) => {
          return (
            <Link
              href={`/artist-songs?name=${artist.artistName}`}
              key={artist.id}
              className="col-span-4 bg-gradient-to-r from-green-800 to-palette_one h-40 rounded-lg flex items-end p-5"
            >
              <span>{artist.artistName}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
