import axios from "axios";

const api = axios.create({
  baseURL: "/api", // le proxy Vite redirige vers http://localhost:3000
  timeout: 5000,
});

export default api;
