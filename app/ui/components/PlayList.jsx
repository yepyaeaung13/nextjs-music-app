"use client";
import { storage } from "@/lib/config/firebase.config";
import { add } from "@/lib/features/player/playerSlice";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);
  const [filterSongs, setFilterSongs] = useState([]);

  const searchHandler = (e) => {
    const searchString = e.target.value.toLowerCase();
    setFilterSongs(() => {
      return songs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchString) ||
          song.artist.toLowerCase().includes(searchString)
      );
    });
  };
  useEffect(() => {
    fetch("http://localhost:3000/api/playlist")
      .then((res) => res.json())
      .then((json) => {
        setSongs(json.result.rows);
        setFilterSongs(json.result.rows);
      })
      .catch((err) => console.log("error occur", err));
  }, []);

  const playHandler = (songs, id, idx, src) => {
    getDownloadURL(
      ref(storage, `gs://music-player-f65df.appspot.com/${src}`)
    ).then((url) =>
      dispatch(add({ songs: songs, id: id, index: idx, url: url }))
    );
  };

  return (
    <div className="h-[100vh] bg-secondary px-10 py-5 grid grid-rows-12 gap-2">
      <div className="row-span-1 grid grid-cols-12 px-2 gap-2">
        <h2 className="col-span-6 bg-gradient-to-r from-green-800 to-palette_one rounded-md flex justify-center items-center">
          <span className="text-xl">My Play Lists</span>
        </h2>
        <div className="col-span-6 flex justify-center items-center">
          <input
            type="search"
            autoFocus
            name=""
            id=""
            onKeyUp={searchHandler}
            placeholder="search by song's name"
            className="bg-palette_one border-b border-green-600 rounded-2xl focus:outline-none px-3 h-8 w-96"
          />
        </div>
      </div>
      <div className="row-span-11 all-songs grid grid-cols-12 gap-2 h-[75vh] px-2 py-2 overflow-y-scroll scrollbar">
        {filterSongs.map((song, idx) => {
          return (
            <div
              key={song.id}
              className={`col-span-4 h-16 border px-5 py-1 grid grid-cols-12 items-center duration-300 rounded-md hover:border-palette_two ${
                player.id == song.id ? "border-green-600" : "border-palette_one"
              }`}
            >
              <span className="all-song col-span-1"></span>
              <div
                onClick={() => {
                  playHandler(filterSongs, song.id, idx, song.src);
                }}
                className="col-span-10 cursor-pointer"
              >
                <h2 className="line-clamp-1 flex gap-1 items-center">
                  {player.id === song.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                  <span className="">{song.title}</span>
                </h2>
                <span className="text-palette_three">{song.artist}</span>
              </div>
              <div className="col-span-1 flex gap-4 items-center justify-end">
                <div className="group relative cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                  </svg>
                  <div className="group-hover:flex w-28 items-start flex-col absolute right-2 top-5 bg-palette_one hidden rounded-md">
                    <button className="hover:text-green-500 w-full px-2 py-1 duration-200 text-sm flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 text-green-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                        />
                      </svg>
                      <span className="line-clamp-1">remove list</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
