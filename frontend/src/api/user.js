const BASE_URL = import.meta.env.VITE_API_URL;

export const getUserData = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to get user data");
  }

  return res.json();
};
