import axios from "axios";
console.log("BASE_URL =", import.meta.env.VITE_API_BASE_URL); // phải là http://localhost:3000/api
const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });
http.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
export default http;
