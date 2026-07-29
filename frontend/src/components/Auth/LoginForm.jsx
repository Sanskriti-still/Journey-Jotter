import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-sky-500 to-cyan-400 flex justify-center items-center p-6">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">

        <h1 className="text-4xl font-bold text-white text-center">
          Welcome Back
        </h1>

        <p className="text-white/80 text-center mt-2">
          Sign in to continue your journey.
        </p>

        <div className="mt-8">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl mb-5 outline-none"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-4 rounded-xl outline-none"
            />

            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>

          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 mt-6 font-semibold">
            Login
          </button>

          <p className="text-center text-white mt-6">
            Don't have an account?

            <Link
              to="/signup"
              className="font-bold ml-2 underline"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default LoginForm;