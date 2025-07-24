import { useState } from "react";
import { getAllTasks } from "../api/tasks";

export const useTasks = () => {
  const [error, setError] = useState("");

  const getUserTasks = async () => {
    setError("");
    try {
      const { tasks } = await getAllTasks();
      return tasks;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };


  return { getUserTasks, error };
};
