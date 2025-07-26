const BASE_URL = import.meta.env.VITE_API_URL;

export const getUserData = async () => {
  const res = await fetch(`${BASE_URL}/user/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to get user data");
  }

  return res.json();
};
