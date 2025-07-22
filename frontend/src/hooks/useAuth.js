import { useState } from "react";
import { login, register } from "../api/auth";

export const useAuth = () => {
  const [error, setError] = useState("");

  const loginUser = async (username, password) => {
    setError("");
    try {
      const { token } = await login(username, password);
      localStorage.setItem("token", token);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const registerUser = async (username, password, dob) => {
    setError("");
    try {
      const { token } = await register(username, password, dob);
      localStorage.setItem("token", token);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };


  return { loginUser, registerUser, error };
};
