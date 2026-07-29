import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-extrabold text-blue-700 leading-tight">
              Plan Your Dream Trip
              <br />
              with AI ✈️
            </h1>

            <p className="mt-8 text-xl text-gray-600 leading-8">
              Journey Jotter creates personalized travel itineraries,
              shows weather, destination maps, budget planning,
              expense splitting and much more in seconds.
            </p>

            <div className="flex gap-5 mt-10 flex-wrap">

              <Link
                to="/planner"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
              >
                🚀 Start Planning
              </Link>

              <Link
                to="/dashboard"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold"
              >
                📊 Dashboard
              </Link>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900"
              alt="Travel"
              className="rounded-3xl shadow-2xl w-full max-w-xl"
            />
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >

          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <div className="text-5xl">🤖</div>
            <h2 className="text-2xl font-bold mt-5">
              AI Itinerary
            </h2>
            <p className="text-gray-600 mt-3">
              Generate personalized travel plans within seconds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <div className="text-5xl">🌤️</div>
            <h2 className="text-2xl font-bold mt-5">
              Live Weather
            </h2>
            <p className="text-gray-600 mt-3">
              Check current weather before you travel.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <div className="text-5xl">🗺️</div>
            <h2 className="text-2xl font-bold mt-5">
              Maps & Budget
            </h2>
            <p className="text-gray-600 mt-3">
              View maps, split expenses and plan smartly.
            </p>
          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Home;