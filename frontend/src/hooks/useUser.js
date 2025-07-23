import { useState } from "react";
import { getUserData } from "../api/user";

export const useUser = () => {
  const [error, setError] = useState("");

  const fetchUser = async () => {
    setError("");
    try {
      const { user } = await getUserData();
      return user;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return { fetchUser, error };
};
