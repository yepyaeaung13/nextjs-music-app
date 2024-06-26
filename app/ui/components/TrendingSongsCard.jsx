"use client";
import { storage } from "@/lib/config/firebase.config";
import { add } from "@/lib/features/player/playerSlice";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TrendingSongsCard = ({ topTrendingSongs, song, idx }) => {
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
    fetch("http://localhost:3000/api/add-like-songs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ song: song, userId: auth[0].id }),
    }).catch((err) => console.error(err));
  };
  const playListSongHandler = (song) => {
    fetch("http://localhost:3000/api/add-playlist-songs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ song: song, userId: auth[0].id }),
    }).catch((err) => console.error(err));
  };
  return (
    <div
      key={song.id}
      className={`px-5 py-1 grid grid-cols-12 items-center hover:bg-palette_one duration-300 rounded-md ${
        player.id == song.id ? "bg-palette_one" : ""
      }`}
    >
      <span className="trending-song col-span-1"></span>
      <div
        onClick={() => {
          playHandler(topTrendingSongs, song.id, idx, song.src);
        }}
        className="col-span-9 cursor-pointer"
      >
        <h2 className="line-clamp-1">
          {player.id === song.id ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 text-green-500 inline-block"
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
        </h2>
        <span className="text-palette_three">{song.artist}</span>
      </div>
      <div className="col-span-2 flex gap-4 items-center justify-end">
        <button
          onClick={() => {
            likeSongHandler(song);
          }}
          className={`text-green-500 active:scale-85 duration-300 ${
            auth == null ? "hidden" : "block"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 pointer-events-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            playListSongHandler(song);
          }}
          title="add play list"
          className={`active:scale-85 duration-300 ${
            auth == null ? "hidden" : "block"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 pointer-events-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TrendingSongsCard;
