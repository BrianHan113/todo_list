import { useState } from 'react';
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignUpModal() {
  const { registerUser, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await registerUser(username, password, dob);
      if (success) navigate("/app");
    } catch (err) {
      console.error("Register failed:", err.message);
    }
  };

  return (
    <>
      <p className="mt-5 text-sm text-center text-white select-none">
        Don't have an account?{" "}
        <span
          onClick={() => setOpen(true)}
          className="underline text-blue-600 cursor-pointer"
        >
          Sign up
        </span>
      </p>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40">
          <div className="bg-amber-600 p-6 rounded-lg w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-center select-none">Create an Account</h2>

            <form className="flex flex-col space-y-1 w-full"
              onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus={typeof window !== 'undefined' && window.innerWidth >= 768}
                className="p-3 border rounded-md focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border rounded-md focus:outline-none"
              />
              <input
                type="date"
                max={new Date().toISOString().split("T")[0]} // prevents future dates
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="p-3 border border-white text-white/60 rounded-md focus:outline-none"
              />
              {error && <p className="text-sm text-center text-red-600">{error}</p>}
              <button type="submit"
                className="bg-yellow-500 hover:bg-orange-400 duration-150 ease-in-out text-white font-bold py-3 rounded-md cursor-pointer"
              >
                Register & Login
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-orange-400 hover:bg-orange-400 duration-150 ease-in-out text-white font-bold py-3 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  )
}
