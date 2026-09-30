import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)
