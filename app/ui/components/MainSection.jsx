"use client";
import { storage } from "@/lib/config/firebase.config";
import { add } from "@/lib/features/player/playerSlice";

import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MainSection = () => {
  const player = useSelector((state) => state.player);
  const [topTenSongs, setTopTenSongs] = useState([]);
  const [topTrendingSongs, setTopTrendingSongs] = useState([]);
  const dispatch = useDispatch();
  const playHandler = (songs, id, idx, src) => {
    getDownloadURL(
      ref(storage, `gs://music-player-f65df.appspot.com/${src}`)
    ).then((url) =>
      dispatch(add({ songs: songs, id: id, index: idx, url: url }))
    );
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/toptensongs")
      .then((res) => res.json())
      .then((json) => setTopTenSongs(json.result.rows))
      .catch((err) => console.log("error occur", err));

    fetch("http://localhost:3000/api/toptrendingsongs")
      .then((res) => res.json())
      .then((json) => setTopTrendingSongs(json.result.rows))
      .catch((err) => console.log("error occur", err));
  }, []);

  const likeSongHandler = (song) => {
    dispatch(addLikeSong(song));
  };
  const playListSongHandler = (song) => {
    dispatch(addPlayListSong(song));
  };
  return (
    <main className="h-[100vh] overflow-hidden grid grid-cols-10">
      <section className="col-span-7 flex flex-col gap-1 bg-secondary">
        <div className="">
          <div className="w-full h-40 bg-gradient-to-r from-primary via-green-600 to-green-700 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl font-bold">Top 10 Songs</h1>
            <h2 className="text-xl font-bold">of the weekend</h2>
          </div>
        </div>
        <div className="px-2">
          <div className="top-ten-songs-list grid grid-cols-1 gap-1 text-sm px-8 py-5 h-96 overflow-y-scroll scrollbar border border-palette_one rounded-md">
            {topTenSongs.map((song, idx) => {
              return (
                <div
                  key={song.id}
                  className={`grid grid-cols-12 rounded-md items-center border px-2 hover:border-palette_two duration-200 ${
                    player.id == song.id
                      ? "border-green-600"
                      : "border-palette_one"
                  }`}
                >
                  <span className="col-span-1 top-ten-song text-center"></span>
                  <div
                    onClick={() => {
                      playHandler(topTenSongs, song.id, idx, song.src);
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

                  <div className="col-span-1 text-center">
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
            })}
          </div>
        </div>
      </section>
      <aside className="col-span-3 p-3 flex flex-col gap-2 bg-secondary">
        <h1 className="text-lg">Trending Songs</h1>
        <div className="trending-songs-list px-2 py-3 text-sm h-[81vh] overflow-y-scroll scrollbar border border-palette_one rounded-md">
          {topTrendingSongs.map((song, idx) => {
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
                  <button className="text-green-500">
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
                  <button title="add play list">
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
                        d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </main>
  );
};

export default MainSection;
