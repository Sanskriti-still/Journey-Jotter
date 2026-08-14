import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError(
            "An account with this email already exists."
          );
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError("Please choose a stronger password.");
          break;

        default:
          setError(
            error.message ||
              "Unable to create your account. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 px-6 py-10">

      <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-2xl md:grid-cols-2">

          {/* ================= LEFT SIDE ================= */}

          <div className="hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-10 text-white md:flex md:flex-col md:justify-between">

            <div>

              <div className="flex items-center gap-2 text-2xl font-black">
                🌍 Journey Jotter
              </div>

              <div className="mt-20">

                <Sparkles size={42} />

                <h1 className="mt-6 text-4xl font-black leading-tight">
                  Your journey begins
                  with one click.
                </h1>

                <p className="mt-5 max-w-md text-lg leading-8 text-white/80">
                  Create your account and let Journey
                  Jotter help you plan amazing trips,
                  discover places and travel smarter.
                </p>

              </div>

            </div>

            <p className="text-sm text-white/70">
              ✈️ Plan • Explore • Travel
            </p>

          </div>

          {/* ================= SIGNUP FORM ================= */}

          <div className="p-7 sm:p-10 md:p-12">

            <div className="mx-auto max-w-md">

              {/* MOBILE LOGO */}

              <div className="mb-8 text-center md:hidden">

                <div className="text-2xl font-black text-blue-600">
                  🌍 Journey Jotter
                </div>

              </div>

              <div className="mb-8">

                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">
                  <UserPlus size={16} />
                  GET STARTED
                </span>

                <h2 className="mt-4 text-3xl font-black text-slate-900">
                  Create your account
                </h2>

                <p className="mt-2 text-slate-500">
                  Start planning your next adventure.
                </p>

              </div>

              {/* ERROR */}

              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">

                  <AlertCircle
                    size={19}
                    className="mt-0.5 shrink-0"
                  />

                  <p>{error}</p>

                </div>
              )}

              <form
                onSubmit={handleSignup}
                className="space-y-5"
              >

                {/* NAME */}

                <div>

                  <label className="mb-2 block font-semibold text-slate-700">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500"
                    />

                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Enter your name"
                      autoComplete="name"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div>

                  <label className="mb-2 block font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />

                  </div>

                </div>

                {/* PASSWORD */}

                <div>

                  <label className="mb-2 block font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-600"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* CONFIRM PASSWORD */}

                <div>

                  <label className="mb-2 block font-semibold text-slate-700">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500"
                    />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (value) => !value
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* SIGNUP BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-lg font-bold text-white shadow-xl shadow-cyan-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={21} />
                      Create Account
                    </>
                  )}

                </button>

              </form>

              {/* LOGIN */}

              <p className="mt-7 text-center text-sm text-slate-500">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-bold text-blue-600 hover:text-blue-700"
                >
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;