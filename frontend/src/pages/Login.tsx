import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loginUser, btnLoading } = useUserData();

  async function submitHandler(e: any) {
    e.preventDefault();

    loginUser(email, password, navigate);
  }

  return (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#121212] via-[#181818] to-[#000000] text-white">
    <div className="bg-[#181818]/80 backdrop-blur-lg border border-[#282828] p-10 rounded-2xl shadow-2xl w-[90%] max-w-md">
      <h2 className="text-4xl font-extrabold text-center mb-8 tracking-tight text-[#1DB954]">
        Login to Spotify
      </h2>

      <form className="space-y-6" onSubmit={submitHandler}>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Email or Username
          </label>
          <input
            type="email"
            placeholder="Email or username"
            className="w-full px-4 py-3 rounded-md bg-[#282828] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 focus:ring-offset-[#121212] transition-all duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-3 rounded-md bg-[#282828] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 focus:ring-offset-[#121212] transition-all duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          disabled={btnLoading}
          className={`w-full py-3 rounded-full font-semibold tracking-wide transition-all duration-300 ${
            btnLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#1DB954] hover:bg-[#1ed760] text-black shadow-lg hover:shadow-[#1db954]/50"
          }`}
        >
          {btnLoading ? "Please Wait..." : "Log In"}
        </button>
      </form>

      <div className="text-center mt-8 text-gray-400">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-[#1DB954] hover:text-[#1ed760] font-semibold"
        >
          Register
        </Link>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">© 2025 Spotify Clone</p>
      </div>
    </div>
  </div>
);
};

export default Login;