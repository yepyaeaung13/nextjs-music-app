import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "songs",
  initialState: {
    likeSongs: [],
    playListSongs: [],
  },
  reducers: {
    updateLikeSongs: (state, actions) => {
      state.likeSongs.push(actions.payload);
    },
    updatePlayListSongs: (state, actions) => {
      state.playListSongs.push(actions.payload);
    },
    preRenderLikeSongs: (state, actions) => {
      state.likeSongs = actions.payload == undefined ? [] : actions.payload;
    },
    preRenderPlayListSongs: (state, actions) => {
      state.playListSongs = actions.payload == undefined ? [] : actions.payload;
    },
  },
});

export const {
  preRenderLikeSongs,
  preRenderPlayListSongs,
  updateLikeSongs,
  updatePlayListSongs,
} = songSlice.actions;
export default songSlice.reducer;
