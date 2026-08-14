import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plane,
  MapPin,
  CalendarDays,
  Wallet,
  Sparkles,
  ArrowRight,
  Compass,
  Heart,
} from "lucide-react";

function Dashboard() {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const savedTrip = localStorage.getItem(
      "latestJourneyJotterTrip"
    );

    if (savedTrip) {
      try {
        setTrip(JSON.parse(savedTrip));
      } catch (error) {
        console.error("Unable to load trip:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 px-6 py-10 md:py-14">
      <div className="mx-auto max-w-7xl">

        {/* ================= HERO ================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-2xl md:p-12"
        >
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10" />

          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10" />

          <div className="relative z-10 max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <Sparkles size={16} />
              AI-POWERED TRAVEL COMPANION
            </div>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Your next adventure
              <br />
              starts here.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Plan smarter, discover better and travel
              with confidence using Journey Jotter.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/planner"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-blue-600 shadow-xl transition hover:scale-[1.02]"
              >
                <Sparkles size={19} />
                Plan a New Trip
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/my-trips"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <Heart size={18} />
                My Trips
              </Link>

            </div>
          </div>

          <div className="absolute bottom-8 right-10 hidden md:block">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-28 w-28 items-center justify-center rounded-[32px] bg-white/10 backdrop-blur-md"
            >
              <Plane size={55} />
            </motion.div>
          </div>
        </motion.section>

        {/* ================= QUICK FEATURES ================= */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <FeatureCard
            icon={Compass}
            title="AI Itinerary"
            description="Get a personalized day-by-day travel plan."
            color="blue"
          />

          <FeatureCard
            icon={MapPin}
            title="Smart Discovery"
            description="Discover attractions and experiences around you."
            color="cyan"
          />

          <FeatureCard
            icon={Wallet}
            title="Budget Friendly"
            description="Plan your trip while keeping your budget in mind."
            color="violet"
          />

        </div>

        {/* ================= LATEST TRIP ================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
          }}
          className="mt-10"
        >

          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                YOUR TRAVEL SPACE
              </p>

              <h2 className="mt-1 text-3xl font-black text-slate-900">
                Latest Journey
              </h2>
            </div>

            {trip && (
              <Link
                to="/my-trips"
                className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700"
              >
                View My Trips
                <ArrowRight size={17} />
              </Link>
            )}

          </div>

          {trip ? (
            <motion.div
              whileHover={{
                y: -4,
              }}
              className="overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-xl"
            >

              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-7 text-white md:p-8">

                <p className="text-sm font-bold uppercase tracking-wider text-white/70">
                  Latest AI Generated Trip
                </p>

                <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row md:items-center">

                  <div>
                    <h3 className="text-3xl font-black">
                      {trip.destination}
                    </h3>

                    <p className="mt-1 text-white/80">
                      {trip.style} • {trip.travelType}
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <Plane size={27} />
                  </div>

                </div>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-3">

                <TripInfo
                  icon={CalendarDays}
                  label="Duration"
                  value={`${trip.days} ${
                    Number(trip.days) === 1
                      ? "Day"
                      : "Days"
                  }`}
                />

                <TripInfo
                  icon={Wallet}
                  label="Budget"
                  value={`₹${Number(
                    trip.budget || 0
                  ).toLocaleString("en-IN")}`}
                />

                <TripInfo
                  icon={MapPin}
                  label="Travel Type"
                  value={trip.travelType || "Travel"}
                />

              </div>

              <div className="px-6 pb-6">
                <Link
                  to="/my-trips"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 font-bold text-white transition hover:bg-slate-800"
                >
                  Open My Trip
                  <ArrowRight size={18} />
                </Link>
              </div>

            </motion.div>
          ) : (
            <div className="rounded-[30px] border border-slate-200 bg-white p-8 text-center shadow-lg md:p-12">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                <Compass
                  size={30}
                  className="text-blue-600"
                />
              </div>

              <h3 className="mt-5 text-2xl font-black text-slate-900">
                Your next journey is waiting
              </h3>

              <p className="mx-auto mt-2 max-w-md text-slate-500">
                Create your first AI-powered travel plan
                and it will appear here.
              </p>

              <Link
                to="/planner"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-bold text-white shadow-lg shadow-blue-200"
              >
                <Sparkles size={19} />
                Create My First Trip
              </Link>

            </div>
          )}

        </motion.section>

        {/* ================= BOTTOM CTA ================= */}

        <motion.section
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.35,
            duration: 0.6,
          }}
          className="mt-10 rounded-[30px] border border-blue-100 bg-white p-7 shadow-lg md:p-9"
        >

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>
              <div className="flex items-center gap-2">
                <Sparkles
                  size={20}
                  className="text-blue-600"
                />

                <span className="font-bold text-blue-600">
                  JOURNEY JOTTER
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Ready for your next adventure?
              </h2>

              <p className="mt-1 text-slate-500">
                Let AI handle the planning. You enjoy the journey.
              </p>
            </div>

            <Link
              to="/planner"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-bold text-white shadow-lg shadow-blue-200"
            >
              Start Planning
              <ArrowRight size={18} />
            </Link>

          </div>

        </motion.section>

      </div>
    </div>
  );
}

/* =====================================================
   FEATURE CARD
===================================================== */

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}) {
  const styles = {
    blue: {
      bg: "bg-blue-50",
      icon: "bg-blue-100 text-blue-600",
    },
    cyan: {
      bg: "bg-cyan-50",
      icon: "bg-cyan-100 text-cyan-600",
    },
    violet: {
      bg: "bg-violet-50",
      icon: "bg-violet-100 text-violet-600",
    },
  };

  const current = styles[color] || styles.blue;

  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className={`rounded-3xl border border-white bg-white p-6 shadow-lg transition hover:shadow-xl`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${current.icon}`}
      >
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-xl font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </motion.div>
  );
}

/* =====================================================
   TRIP INFO
===================================================== */

function TripInfo({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
          <Icon
            size={19}
            className="text-blue-600"
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate font-bold text-slate-900">
            {value}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;