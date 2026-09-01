import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../config/api";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("lax360_admin_user");
    try {
      return savedAdmin ? JSON.parse(savedAdmin) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("lax360_admin_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const savedToken = localStorage.getItem("lax360_admin_token");
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/api/admin/verify");
        if (response.data?.success) {
          // Token is valid
          setAdmin(response.data.admin || { email: "lax360salem@gmail.com", role: "admin" });
        }
      } catch (err) {
        console.warn("Session verification failed:", err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/admin/login", { email, password });
      if (response.data?.success) {
        const { token: receivedToken, admin: adminData } = response.data;
        localStorage.setItem("lax360_admin_token", receivedToken);
        localStorage.setItem("lax360_admin_user", JSON.stringify(adminData));
        setToken(receivedToken);
        setAdmin(adminData);
        return { success: true };
      }
      return { success: false, message: response.data?.message || "Login failed" };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Connection error. Please ensure backend is running.";
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem("lax360_admin_token");
    localStorage.removeItem("lax360_admin_user");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
