const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Getting all tasks failed");
  }

  return res.json();
};

export const deleteTask = async (task_id) => {
  const res = await fetch(`${BASE_URL}/tasks/${task_id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Deleting task failed");
  }
};

export const createTask = async (title, description) => {
  const res = await fetch(`${BASE_URL}/tasks/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Creation failed");
  }

  return res.json();
};

export const getTask = async (task_id) => {
  const res = await fetch(`${BASE_URL}/tasks/${task_id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Fetch task failed");
  }

  return res.json();
};

export const updateTask = async (task_id, fields) => {
  const res = await fetch(`${BASE_URL}/tasks/${task_id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(fields),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Update failed");
  }

  return res.json();
};