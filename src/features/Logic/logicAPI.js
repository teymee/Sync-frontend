import axiosInstance from "@/utils/axiosInterceptor";
import { setLocalStorage } from "@/utils/localStorageServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASEURL;
const clientId = import.meta.env.VITE_CLIENT_ID;
const secret = import.meta.env.VITE_SECRET;

console.log(baseUrl, "base");

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

export const getUserTopTracks = createAsyncThunk("logic/getUserTopTracks", async () => {
  const response = await axiosInstance.get("me/top/tracks");

  return response?.data;
});
