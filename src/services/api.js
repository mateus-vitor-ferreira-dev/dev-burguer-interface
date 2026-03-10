import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem("devburguer:userData");

  if (userData) {
    const token = JSON.parse(userData).token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});