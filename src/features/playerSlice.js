import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  isPlaying: false,
  currentTrackId: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addPlaylist: (state, action) => {
      state.item = action.payload;
    },
    playPouse: (state, action) => {
      state.currentTrackId = action.payload;
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const selectItem = (state) => state.playlist.item;
export const selectPlaying = (state) => state.playlist.isPlaying;
export const { addPlaylist, playPouse } = playlistSlice.actions;
export default playlistSlice.reducer;
