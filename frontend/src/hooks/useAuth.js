import { useState } from "react";
import { login } from "../api/auth";

export const useAuth = () => {
  const [error, setError] = useState("");

  const loginUser = async (username, password, onSuccess) => {
    setError("");
    try {
      const { token } = await login(username, password);
      localStorage.setItem("token", token);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return { loginUser, error };
};
