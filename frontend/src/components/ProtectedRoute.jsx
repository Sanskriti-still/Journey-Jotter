import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

function ProtectedRoute({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);
        setLoading(false);

      }
    );


    return () => unsubscribe();

  }, []);



  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-2xl font-bold text-blue-600">
          Loading...
        </h2>

      </div>
    );

  }



  if (!user) {

    return <Navigate to="/login" />;

  }



  return children;

}


export default ProtectedRoute;