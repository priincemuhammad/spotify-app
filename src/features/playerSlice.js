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
    setCurrentId: (state, action) => {
      state.currentTrackId = action.payload;
    },
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const selectItem = (state) => state.playlist.item;
export const selectPlaying = (state) => state.playlist.isPlaying;
export const selectCurrentTrackId = (state) => state.playlist.currentTrackId;
export const { addPlaylist, playPause, setCurrentId } = playlistSlice.actions;
export default playlistSlice.reducer;
