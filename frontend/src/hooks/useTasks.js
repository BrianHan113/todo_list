import { useState } from "react";
import { getAllTasks, deleteTask, createTask, getTask, updateTask } from "../api/tasks";

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

  const createATask = async (title, description) => {
    setError("");
    try {
      const task = await createTask(title, description);
      return task;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const getATask = async (task_id) => {
    setError("");
    try {
      const { task } = await getTask(task_id);
      return task;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const updateATask = async (task_id, fields) => {
    setError("");
    try {
      const updatedTask = await updateTask(task_id, fields);
      return updatedTask;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };


  return { getUserTasks, deleteATask, createATask, getATask, updateATask, error };
};
