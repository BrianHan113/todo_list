import { useState } from "react";
import { getAllTasks, deleteTask } from "../api/tasks";

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

  const deleteATask = async (task_id) => {
    setError("");
    try {
      await deleteTask(task_id);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };


  return { getUserTasks, deleteATask, error };
};
