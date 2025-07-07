import { createSlice } from "@reduxjs/toolkit";
import { getUserTopItems } from "./logicAPI";
import { lowerCase } from "@/utils/helperFn";

let initialState = {
  userTopTracks: {
    isLoading: false,
    tracks: null,
    artists: null,
  },
};

const logicSlice = createSlice({
  name: "logicSlice",
  initialState,
  extraReducers: (builder) => {
    // 🚨 User top tracks
    builder
      .addCase(getUserTopItems.pending, (state) => {
        state.userTopTracks.isLoading = true;
      })
      .addCase(getUserTopItems.fulfilled, (state, { payload, meta }) => {
        const type = lowerCase(meta?.arg?.type);
        state.userTopTracks[type] = payload;
        state.userTopTracks.isLoading = false;
      });
  },
});

const logicStore = logicSlice.reducer;
export const logicState = (state) => state?.logicStore;
export default logicStore;
