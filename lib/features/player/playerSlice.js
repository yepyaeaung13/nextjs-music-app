import { storage } from "@/lib/config/firebase.config";
import { createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref } from "firebase/storage";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    songs: null,
    id: null,
    paused: false,
    playerIndex: null,
    url: null,
  },
  reducers: {
    add: (state, actions) => {
      state.songs = actions.payload.songs;
      state.id = actions.payload.id;
      state.playerIndex = actions.payload.index;
      state.url = actions.payload.url;
      state.paused = true;
    },
    togglePause: (state) => {
      state.paused = !state.paused;
    },
    nextSong: (state, actions) => {
      state.id = actions.payload.id;
      state.url = actions.payload.url;
      if (state.songs.length - 1 === state.playerIndex) {
        state.playerIndex = 0;
      } else {
        state.playerIndex += 1;
      }
    },
    previousSong: (state, actions) => {
      state.id = actions.payload.id;
      state.url = actions.payload.url;
      if (state.playerIndex === 0) {
        state.playerIndex = state.songs.length - 1;
      } else {
        state.playerIndex -= 1;
      }
    },
  },
});

export const { add, togglePause, nextSong, previousSong } = playerSlice.actions;
export default playerSlice.reducer;
