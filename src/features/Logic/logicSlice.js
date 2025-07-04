import { createSlice } from "@reduxjs/toolkit";
import { getUserTopTracks } from "./logicAPI";

let initialState = {
  userTopTracks: {
    isLoading: false,
    data: null,
  },
};

const logicSlice = createSlice({
  name: "logicSlice",
  initialState,
  extraReducers: (builder) => {
    // 🚨 User top tracks
    builder
      .addCase(getUserTopTracks.pending, (state) => {
        state.userTopTracks.isLoading = true;
      })
      .addCase(getUserTopTracks.fulfilled, (state, { payload }) => {
        state.userTopTracks.isLoading = false;
        state.userTopTracks.data = payload;
      });
  },
});

const logicStore = logicSlice.reducer;
export default logicStore;
