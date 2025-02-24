import axios from "axios";

// ✅ Create an instance of Axios with default settings
const api = axios.create({
  baseURL: "http://localhost:8002/api", // 🔥 Ensure this matches your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
