import { useState } from 'react';

export default function SignUpModal({ onTrigger }) {
  const [open, setOpen] = useState(false)

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
          <div className="bg-amber-600 p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-center select-none">Create an Account</h2>

            <form className="flex flex-col space-y-1 w-full"
              onSubmit={e => {
                e.preventDefault();
                onTrigger();
              }}>
              <input
                type="text"
                placeholder="Username"
                autoFocus={typeof window !== 'undefined' && window.innerWidth >= 768}
                className="p-3 border rounded-md focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-3 border rounded-md focus:outline-none"
              />
              <input
                type="date"
                max={new Date().toISOString().split("T")[0]} // prevents future dates
                className="p-3 border border-white text-white/60 rounded-md focus:outline-none"
              />
              <button type="submit"
                className="bg-yellow-500 hover:bg-orange-400 duration-150 ease-in-out text-white font-bold py-3 rounded-md "
              >
                Register & Login
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-orange-400 hover:bg-orange-400 duration-150 ease-in-out text-white font-bold py-3 rounded-md "
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
