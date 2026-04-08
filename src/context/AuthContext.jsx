import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Use environment variable for backend API URL
const AUTH_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/auth`
  : "http://localhost:2026/api/auth";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken) {
        setToken(savedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

        try {
          const res = await axios.get(`${AUTH_URL}/me`);
          if (res.data && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }
        } catch (error) {
          console.error("Token verification failed:", error.message);
          clearAuth();
        }
      } else if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const login = async (name, password, role) => {
  try {

    // ✅ SAMPLE UNIVERSAL LOGIN
    if (name === "12345" && password === "12345") {

      const testUser = {
        name: "Test User",
        role: role,
      };

      localStorage.setItem("user", JSON.stringify(testUser));
      localStorage.setItem("token", "sample-token");

      setUser(testUser);
      setToken("sample-token");

      return { success: true, user: testUser };
    }

    // ✅ NORMAL BACKEND LOGIN
    const res = await axios.post(`${AUTH_URL}/login`, {
      name,
      password,
    });

    const { token: jwtToken, user: userData } = res.data;

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));

    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

    setToken(jwtToken);
    setUser(userData);

    return { success: true, user: userData };

  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Login failed. Please try again.",
    };
  }
};

  const register = async (data) => {
    try {
      const res = await axios.post(`${AUTH_URL}/register`, data);
      const { token: jwtToken, user: userData } = res.data;

      localStorage.setItem("token", jwtToken);
      localStorage.setItem("user", JSON.stringify(userData));

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      setToken(jwtToken);
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed. Please try again.",
      };
    }
  };

  const logout = () => {
    clearAuth();
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => !!token && !!user;
  const hasRole = (role) => user?.role === role;

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
