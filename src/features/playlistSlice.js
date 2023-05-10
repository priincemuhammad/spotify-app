import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addPlaylist: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const selectItem = (state) => state.playlist.item;
export const { addPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
