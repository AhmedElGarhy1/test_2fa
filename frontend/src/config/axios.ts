import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `http://192.168.1.4:3000/api`;

const baseAxios = axios.create({
  baseURL: API_URL,
});

// Request Interceptor to add the access token to every request
baseAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a request interceptor
baseAxios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    const rawMessage = error?.response?.data?.message;
    let message = "";
    if (typeof rawMessage === typeof []) {
      message = rawMessage[0];
    } else {
      message = rawMessage;
      console.log(rawMessage);
    }

    toast.error(message);

    return Promise.reject(error);
  }
);

export default baseAxios;
