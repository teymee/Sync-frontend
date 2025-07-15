import axios from "axios";
import { getLocalStorage, setLocalStorage } from "./localStorageServices";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NODE_URL,
  //   timeout: 1000,
  withCredentials: true,
});

const refreshToken = async () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const secret = import.meta.env.VITE_SECRET;
  try {
    const data = {
      grant_type: "refresh_token",
      refresh_token: getLocalStorage("token")?.refresh_token,
    };
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

    return response;
  } catch (err) {
    console.log(err, "refresh token");
  }
};

//🚨 Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("token")?.access_token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//🚨 Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // if (error.response.status === 401) {
    //   console.error("Unauthorized access - redirecting to login");
    //   window.location.href = "/login"; // Adjust the path as needed
    // }

    // 🚨 Refresh  token
    const originalRequest = error.config;
    const errorResponse = error?.response?.status;

    if (errorResponse === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const response = await refreshToken();

      setLocalStorage("token", response?.data);
      axiosInstance.defaults.headers.Authorization = `Bearer ${response?.data?.access_token}`;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
