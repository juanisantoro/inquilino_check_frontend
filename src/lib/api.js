import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;
export function api() {
  const instance = axios.create({
    baseURL: API,
  });
  instance.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return instance;
}
