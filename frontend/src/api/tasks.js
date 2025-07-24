const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllTasks = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/tasks/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Getting all tasks failed");
  }

  return res.json();
};

export const deleteTask = async (task_id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/tasks/${task_id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Deleting task failed");
  }
};