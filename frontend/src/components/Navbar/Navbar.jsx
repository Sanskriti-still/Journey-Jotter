import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      toast.success("Logged out successfully!");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          🌍 Journey Jotter
        </Link>

        <ul className="flex gap-8 items-center font-semibold">

          <li>
            <Link to="/">Home</Link>
          </li>

          {user && (
            <>
              <li>
                <Link to="/planner">Planner</Link>
              </li>

              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          )}

          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-blue-600 font-medium">
                {user.email}
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>

      </div>
    </nav>
  );
}

export default Navbar;