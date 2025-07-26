import { useState } from "react";
import { login, register } from "../api/auth";

export const useAuth = () => {
  const [error, setError] = useState("");

  const loginUser = async (username, password) => {
    setError("");
    try {
      await login(username, password);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const registerUser = async (username, password, dob) => {
    setError("");
    try {
      await register(username, password, dob);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  };

  return { loginUser, registerUser, logout, error };
};
