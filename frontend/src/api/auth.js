const BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Login failed");
  }

  return res.json();
};

export const register = async (username, password, dob) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, dob }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Register failed");
  }

  return res.json();
};
