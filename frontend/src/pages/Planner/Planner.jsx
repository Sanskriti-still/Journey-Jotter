import { motion } from "framer-motion";
import TripPlanner from "../../components/TripPlannerComponent/TripPlanner";

function Planner() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100">
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute right-0 top-80 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative">
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl px-6 pb-8 pt-12 text-center"
        >
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
            ✨ PLANNER 2.0
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
            Plan Your
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}Perfect Journey
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Tell Journey Jotter where you're going and what kind of experience
            you want. We'll build a personalized journey around you.
          </p>
        </motion.section>

        <TripPlanner />
      </div>
    </div>
  );
}

export default Planner;