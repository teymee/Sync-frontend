import axios from "axios";
import { getLocalStorage } from "./localStorageServices";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NODE_URL,
  //   timeout: 1000,
  withCredentials: true,
});

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
  (error) => {
    // if (error.response.status === 401) {
    //   console.error("Unauthorized access - redirecting to login");
    //   window.location.href = "/login"; // Adjust the path as needed
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
