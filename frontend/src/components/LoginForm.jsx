import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { loginUser, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await loginUser(username, password);
      if (success) navigate("/app");
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  return (
    <form
      className="flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus={typeof window !== "undefined" && window.innerWidth >= 768}
        className="p-3 border rounded-md focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border rounded-md focus:outline-none"
      />
      {error && <p className="text-sm text-center text-red-600">{error}</p>}
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-orange-400 duration-150 ease-in-out text-white font-bold py-3 rounded-md cursor-pointer"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
