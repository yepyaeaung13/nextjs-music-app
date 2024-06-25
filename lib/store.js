"use client";
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/player/playerSlice";
import songReducer from "./features/songs/songSlice";

export default configureStore({
  reducer: {
    player: playerReducer,
    songs: songReducer,
  },
});
