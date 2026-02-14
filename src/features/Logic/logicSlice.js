import { createSlice } from "@reduxjs/toolkit";
import { getArtistAlbums, getArtistDetails, getUserTopItems } from "./logicAPI";
import { lowerCase } from "@/utils/helperFn";

let initialState = {
  userTopTracks: {
    isLoading: true,
    tracks: null,
    artists: null,
  },

  artistDetails: {
    isLoading: true,
    details: null,
  },

  artistAlbums: {
    isLoading: true,
    albums: null,
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

    // 🚨 Artist details
    builder
      .addCase(getArtistDetails.pending, (state) => {
        state.artistDetails.isLoading = true;
      })
      .addCase(getArtistDetails.fulfilled, (state, { payload }) => {
        state.artistDetails.details = payload;
        state.artistDetails.isLoading = false;
      });

    // 🚨 Artist albums
    builder
      .addCase(getArtistAlbums.pending, (state) => {
        state.artistAlbums.isLoading = true;
      })
      .addCase(getArtistAlbums.fulfilled, (state, { payload }) => {
        state.artistAlbums.albums = payload;
        state.artistAlbums.isLoading = false;
      });
  },
});

const logicStore = logicSlice.reducer;
export const logicState = (state) => state?.logicStore;
export default logicStore;
