import { addLikeSongs } from "@/app/api/lib/data";
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
    preRenderLikeSongs: (state, actions) => {
      state.likeSongs = actions.payload;
    },
  },
  preRenderPlayListSongs: (state, actions) => {
    state.playListSongs = actions.payload;
  },
});

export const { preRenderLikeSongs, preRenderPlayListSongs, updateLikeSongs } =
  songSlice.actions;
export default songSlice.reducer;
