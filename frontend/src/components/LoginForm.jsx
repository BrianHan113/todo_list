const LoginForm = ({ onSubmit, error, username, setUsername, password, setPassword }) => (
  <form
    className="flex flex-col space-y-4 w-full"
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
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
    {error && <p className="text-sm text-center">{error}</p>}
    <button
      type="submit"
      className="bg-yellow-500 hover:bg-orange-400 duration-150 ease-in-out text-white font-bold py-3 rounded-md cursor-pointer"
    >
      Login
    </button>
  </form>
);

export default LoginForm;
