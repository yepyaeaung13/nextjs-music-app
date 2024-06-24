"use client";
import { storage } from "@/lib/config/firebase.config";
import {
  nextSong,
  previousSong,
  togglePause,
} from "@/lib/features/player/playerSlice";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Player = () => {
  const [loop, setLoop] = useState(false);
  const [songDurationTag, setSongDurationTag] = useState("");
  const [songCurrentTimeTag, setSongCurrentTimeTag] = useState("");
  const [currentProgressTag, setCurrentProgressTag] = useState("");
  const [audioElement, setAudioElement] = useState("");
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const loopHandler = () => {
    setLoop(!loop);
  };

  useEffect(() => {
    const audioElement = document.querySelector("#audio");
    setAudioElement(audioElement);
  }, []);

  const pausedHandler = () => {
    if (player.id !== null) {
      dispatch(togglePause());
      if (player.paused) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
    }
  };

  const nextSongHandler = () => {
    if (player.id !== null) {
      const newSongId = player.songs.filter(
        (song, idx) =>
          idx ===
          (player.playerIndex === player.songs.length - 1
            ? 0
            : player.playerIndex + 1)
      );
      getDownloadURL(
        ref(storage, `gs://music-player-f65df.appspot.com/${newSongId[0].src}`)
      ).then((url) => dispatch(nextSong({ id: newSongId[0].id, url: url })));
    }
  };
  const previousSongHandler = () => {
    if (player.id !== null) {
      const newSongId = player.songs.filter(
        (song, idx) =>
          idx ===
          (player.playerIndex === 0
            ? player.songs.length - 1
            : player.playerIndex - 1)
      );
      getDownloadURL(
        ref(storage, `gs://music-player-f65df.appspot.com/${newSongId[0].src}`)
      ).then((url) =>
        dispatch(previousSong({ id: newSongId[0].id, url: url }))
      );
    }
  };

  const changeText = (totalSeconds) => {
    const minute = Math.floor(totalSeconds / 60);
    const second = totalSeconds % 60;
    const minuteText =
      minute < 10 ? "0" + minute.toString() : minute.toString();
    const secondText =
      second < 10 ? "0" + second.toString() : second.toString();
    const durationText = minuteText + ":" + secondText;
    return durationText;
  };

  let totalSeconds = 0;
  useEffect(() => {
    const songDurationTag = document.querySelector(".song-duration");
    setSongDurationTag(songDurationTag);
  }, []);

  const durationHandler = (e) => {
    totalSeconds = Math.floor(e.target.duration);
    const songDurationTime = changeText(totalSeconds);
    songDurationTag.innerText = songDurationTime;
  };

  useEffect(() => {
    const currentProgressTag = document.querySelector(".current-progress");
    setCurrentProgressTag(currentProgressTag);
  }, []);

  const updateProgress = (currentTime) => {
    const updateWidthPixel = (160 / totalSeconds) * currentTime;
    currentProgressTag.style.width = updateWidthPixel + "px";
  };

  useEffect(() => {
    const songCurrentTimeTag = document.querySelector(".song-currentTime");
    setSongCurrentTimeTag(songCurrentTimeTag);
  }, []);

  const currentTimeHandler = (e) => {
    const currentTimeSeconds = Math.floor(e.target.currentTime);
    const songCurrentTime = changeText(currentTimeSeconds);
    songCurrentTimeTag.innerText = songCurrentTime;
    updateProgress(currentTimeSeconds);
  };
  const updateVolume = (e) => {
    if (player.id !== null) {
      audioElement.volume = e.target.value;
    }
  };
  return (
    <div
      className={`fixed w-full left-0 bottom-0 grid grid-cols-12 gap-5 items-center rounded-tl-full rounded-tr-full shadow-2xl border-t border-green-700 bg-primary px-52 py-5`}
    >
      <div className="col-span-4">
        <span className="line-clamp-1 gap-1 text-nowrap">
          {player.id == null ? (
            ""
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 text-green-500 inline-block mx-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
              />
            </svg>
          )}
          {player.id == null
            ? "Choose a song & play"
            : player.songs[player.playerIndex].title}
          {player.id == null
            ? ""
            : " - " + player.songs[player.playerIndex].artist}
        </span>
        <audio
          onLoadedData={durationHandler}
          onTimeUpdate={currentTimeHandler}
          onEnded={nextSongHandler}
          id="audio"
          src={player.id == null ? "" : player.url}
          autoPlay={true}
          loop={loop}
        ></audio>
      </div>
      <div className="col-span-8 flex gap-10">
        <div className="flex justify-center gap-5">
          {loop == false ? (
            <button onClick={loopHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={`w-4 fill-palette_four`}
              >
                {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                <path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z" />
              </svg>
            </button>
          ) : (
            <button onClick={loopHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={`w-4 fill-green-500`}
              >
                {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                <path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z" />
              </svg>
            </button>
          )}
          <button onClick={previousSongHandler} className="text-green-500">
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
                d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
              />
            </svg>
          </button>
          {player.paused ? (
            <button onClick={pausedHandler}>
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
                  d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          ) : (
            <button onClick={pausedHandler}>
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
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
            </button>
          )}
          <button onClick={nextSongHandler} className="text-green-500">
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
                d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="progressbar h-1 w-[160px] bg-palette_three">
            <div className="current-progress h-1 w-[0px] bg-green-500"></div>
          </div>
          <span className="text-nowrap">
            <span className="text-nowrap text-xs song-currentTime">0:00</span>
            {" / "}
            <span className="text-nowrap text-xs song-duration">0:00</span>
          </span>
          <button className="text-green-500 ms-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          </button>
          <input
            type="range"
            onChange={updateVolume}
            name="volume"
            id="volume"
            min={0}
            max={1}
            step={0.1}
            className="w-32 h-1 rounded-lg focus:outline-none bg-green-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-2.5
            [&::-webkit-slider-thumb]:h-2.5
            [&::-webkit-slider-thumb]:-mt-0.5
            [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:bg-palette_four
            [&::-webkit-slider-thumb]:rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
