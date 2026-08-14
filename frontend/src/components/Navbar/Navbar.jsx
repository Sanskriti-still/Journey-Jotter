import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
  };

  return (
    <nav className="flex items-center justify-between bg-white px-8 py-5 shadow-md">
      {/* LOGO */}
      <Link
        to="/"
        className="text-3xl font-bold text-blue-600"
      >
        🌍 Journey Jotter
      </Link>

      {/* NAVIGATION */}
      <div className="flex items-center gap-6">

        {/* HOME */}
        <Link
          to="/"
          className="hover:text-blue-600"
        >
          Home
        </Link>

        {/* PLANNER */}
        <Link
          to="/planner"
          className="hover:text-blue-600"
        >
          Planner
        </Link>

        {user ? (
          <>
            {/* DASHBOARD */}
            <Link
              to="/dashboard"
              className="hover:text-blue-600"
            >
              Dashboard
            </Link>

            {/* MY TRIPS */}
            <Link
              to="/my-trips"
              className="hover:text-blue-600"
            >
              My Trips
            </Link>

            {/* PROFILE */}
            <Link
              to="/profile"
              className="hover:text-blue-600"
            >
              Profile
            </Link>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* LOGIN */}
            <Link
              to="/login"
              className="hover:text-blue-600"
            >
              Login
            </Link>

            {/* SIGN UP */}
            <Link
              to="/signup"
              className="rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
