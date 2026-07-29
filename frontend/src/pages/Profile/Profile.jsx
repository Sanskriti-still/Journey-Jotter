import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { motion } from "framer-motion";

function Profile() {

  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {

    setUser(auth.currentUser);

    const savedTrips =
      JSON.parse(localStorage.getItem("journeyTrips")) || [];

    setTrips(savedTrips);

  }, []);


  const totalTrips = trips.length;

  const favoriteTrips = trips.filter(
    (trip) => trip.favorite
  ).length;


  const totalBudget = trips.reduce(
    (sum, trip) => sum + Number(trip.budget || 0),
    0
  );


  return (

    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 py-12">

      <div className="max-w-5xl mx-auto px-6">


        <motion.div
          initial={{opacity:0,y:50}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.6}}
          className="bg-white rounded-3xl shadow-2xl p-10"
        >


          {/* Profile Header */}

          <div className="flex flex-col items-center">


            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center text-6xl font-bold shadow-xl">

              {user?.email?.charAt(0).toUpperCase() || "U"}

            </div>


            <h1 className="text-5xl font-bold mt-6 text-blue-700">
              My Profile
            </h1>


            <p className="text-gray-500 mt-3 text-lg">
              {user?.email || "User"}
            </p>


            <span className="mt-4 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
              🌍 Journey Jotter Explorer
            </span>


          </div>



          {/* Stats */}


          <div className="grid md:grid-cols-3 gap-8 mt-12">


            <motion.div
              whileHover={{scale:1.05}}
              className="bg-blue-50 rounded-3xl p-8 text-center"
            >

              <h3 className="text-gray-500">
                Total Trips
              </h3>

              <p className="text-5xl font-bold text-blue-700 mt-4">
                {totalTrips}
              </p>

            </motion.div>



            <motion.div
              whileHover={{scale:1.05}}
              className="bg-red-50 rounded-3xl p-8 text-center"
            >

              <h3 className="text-gray-500">
                ❤️ Favorites
              </h3>

              <p className="text-5xl font-bold text-red-600 mt-4">
                {favoriteTrips}
              </p>

            </motion.div>



            <motion.div
              whileHover={{scale:1.05}}
              className="bg-green-50 rounded-3xl p-8 text-center"
            >

              <h3 className="text-gray-500">
                Total Budget
              </h3>

              <p className="text-4xl font-bold text-green-600 mt-4">
                ₹{totalBudget}
              </p>

            </motion.div>


          </div>



          {/* Achievements */}


          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-8 mt-10">

            <h2 className="text-3xl font-bold">
              🏆 Achievements
            </h2>


            <div className="grid md:grid-cols-3 gap-5 mt-6">


              <div className="bg-white/20 rounded-xl p-5">
                ✈️
                <p className="mt-2 font-semibold">
                  Travel Planner
                </p>
              </div>


              <div className="bg-white/20 rounded-xl p-5">
                🤖
                <p className="mt-2 font-semibold">
                  AI Explorer
                </p>
              </div>


              <div className="bg-white/20 rounded-xl p-5">
                🌎
                <p className="mt-2 font-semibold">
                  Journey Creator
                </p>
              </div>


            </div>

          </div>



          {/* Account Information */}


          <div className="bg-gray-50 rounded-3xl p-8 mt-10">


            <h2 className="text-3xl font-bold text-blue-700">
              Account Information
            </h2>


            <div className="space-y-5 mt-6 text-lg">


              <p>
                <span className="font-semibold">
                  Email:
                </span>{" "}
                {user?.email}
              </p>


              <p>
                <span className="font-semibold">
                  Email Verified:
                </span>{" "}
                {user?.emailVerified ? "✅ Yes" : "❌ No"}
              </p>


              <p>
                <span className="font-semibold">
                  User ID:
                </span>{" "}
                {user?.uid}
              </p>


              <p>
                <span className="font-semibold">
                  Status:
                </span>{" "}
                🟢 Active Traveller
              </p>


            </div>


          </div>


        </motion.div>


      </div>

    </section>

  );

}


export default Profile;