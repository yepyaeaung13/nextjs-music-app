"use client";
import { storage } from "@/lib/config/firebase.config";
import { add } from "@/lib/features/player/playerSlice";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopTenSongsCard = ({ songs, song, idx }) => {
  const player = useSelector((state) => state.player);
  const [auth, setAuth] = useState(() => {
    const localValue = localStorage.getItem("AUTH");
    if (localValue == null) {
      return null;
    }
    return JSON.parse(localValue);
  });

  const dispatch = useDispatch();
  const playHandler = (songs, id, idx, src) => {
    getDownloadURL(
      ref(storage, `gs://music-player-f65df.appspot.com/${src}`)
    ).then((url) =>
      dispatch(add({ songs: songs, id: id, index: idx, url: url }))
    );
  };

  const likeSongHandler = (song) => {
    fetch("https://nextjs-music-app-w7op.vercel.app/api/add-like-songs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ song: song, userId: auth[0].id }),
    });
  };
  const playListSongHandler = (song) => {
    fetch("https://nextjs-music-app-w7op.vercel.app/api/add-playlist-songs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ song: song, userId: auth[0].id }),
    });
  };
  return (
    <div
      key={song.id}
      className={`grid grid-cols-12 rounded-md items-center border px-2 hover:border-palette_two duration-200 ${
        player.id == song.id ? "border-green-600" : "border-palette_one"
      }`}
    >
      <span className="col-span-1 top-ten-song text-center"></span>
      <div
        onClick={() => {
          playHandler(songs, song.id, idx, song.src);
        }}
        className="col-span-9 py-3 grid grid-cols-2 cursor-pointer"
      >
        <span className="flex gap-2 items-center">
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
          <span>{song.title}</span>
        </span>
        <span>{song.artist}</span>
      </div>

      <div
        className={`col-span-1 text-center ${
          auth == null ? "hidden" : "block"
        }`}
      >
        <button
          onClick={() => {
            likeSongHandler(song);
          }}
          className="text-green-500"
        >
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
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
      <div className="col-span-1 flex justify-end">
        <div
          className={`group relative cursor-pointer ${
            auth == null ? "hidden" : "block"
          }`}
        >
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
          <div className="group-hover:flex w-24 items-start flex-col absolute right-2 top-5 bg-palette_one hidden rounded-md">
            <button
              onClick={() => {
                playListSongHandler(song);
              }}
              className="hover:text-green-500 w-full px-2 py-1 duration-200 text-sm flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 text-green-500 pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>
              <span>add list</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTenSongsCard;
