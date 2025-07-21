import axiosInstance from "@/utils/axiosInterceptor";
import { setLocalStorage } from "@/utils/localStorageServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { APIs } from "../../../../api/index";


 const APIs = {
  // 🚨 User
  topUserItems: {
    base: "/me/top/items",
    api: (items) => `/me/top/${items?.type}`,
  },

  // 🚨 Audio
  audioFeature: {
    base: "/audio-features",
    api: (trackId) => `/audio-features/${trackId}`,
  },
};
// const baseUrl = import.meta.env.VITE_BASEURL;
const clientId = import.meta.env.VITE_CLIENT_ID;
const secret = import.meta.env.VITE_SECRET;

//THUNKS
export const getSpotifyToken = createAsyncThunk(
  "logic/getSpotifyToken",
  async (data) => {
    const response = await axios.post(
      `https://accounts.spotify.com/api/token`,
      data,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + secret),
        },
      }
    );
    setLocalStorage("token", response?.data);
    return response?.data?.data ?? response?.data;
  }
);

// 🚨 Top tracks

export const getUserTopItems = createAsyncThunk(
  "logic/getUserTopItems",
  async (items) => {
    const { type, time_range = "short_term" } = items ?? {};
    if (!type) return alert("no type");

    const response = await axiosInstance.get(APIs.topUserItems.base, {
      params: items,
    });
    return response?.data;
  }
);

// 🚨 Audio features

export const getAudioFeatures = createAsyncThunk(
  "logic/getAudioFeatures",
  async (trackId) => {
    const response = await axiosInstance.get(APIs.audioFeature.base, {
      params: { trackId },
    });

    console.log(response.data, "audio features");
    return response.data;
  }
);
