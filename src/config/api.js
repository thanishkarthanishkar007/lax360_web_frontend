import axios from "axios";

// Automatically use environment variable or fallback to production backend
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://lax360-web-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("lax360_admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized and currently in admin route, clear token
      if (window.location.pathname.startsWith("/admin")) {
        localStorage.removeItem("lax360_admin_token");
        localStorage.removeItem("lax360_admin_user");
        if (window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
