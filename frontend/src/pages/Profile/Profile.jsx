import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  CalendarDays,
  MapPin,
  Plane,
  Heart,
  LogOut,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tripCount, setTripCount] = useState(0);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser);
    }

    const savedTrips = localStorage.getItem("journeyJotterTrips");

    if (savedTrips) {
      try {
        const trips = JSON.parse(savedTrips);

        if (Array.isArray(trips)) {
          setTripCount(trips.length);
        }
      } catch (error) {
        console.error("Could not read saved trips:", error);
      }
    }

    const latestTrip = localStorage.getItem(
      "latestJourneyJotterTrip"
    );

    if (latestTrip && !savedTrips) {
      setTripCount(1);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Traveler";

  const email =
    user?.email || "No email available";

  const photoURL = user?.photoURL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 px-6 py-10 md:py-14">

      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            <User size={16} />
            YOUR PROFILE
          </span>

          <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Welcome, {displayName} 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your Journey Jotter profile and travel activity.
          </p>
        </motion.div>

        {/* ================= PROFILE CARD ================= */}

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
            delay: 0.1,
          }}
          className="overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-2xl"
        >

          {/* TOP */}

          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-10 text-white md:px-10">

            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />

            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row">

              {/* AVATAR */}

              {photoURL ? (
                <img
                  src={photoURL}
                  alt={displayName}
                  className="h-28 w-28 rounded-full border-4 border-white/40 object-cover shadow-xl"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/30 bg-white/15 text-4xl font-black shadow-xl backdrop-blur-md">
                  {displayName
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              <div className="text-center md:text-left">

                <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Journey Jotter Traveler
                </p>

                <h2 className="mt-1 text-3xl font-black">
                  {displayName}
                </h2>

                <div className="mt-2 flex items-center justify-center gap-2 text-white/80 md:justify-start">
                  <Mail size={16} />
                  <span>{email}</span>
                </div>

              </div>

            </div>
          </div>

          {/* PROFILE DETAILS */}

          <div className="grid gap-5 p-7 md:grid-cols-2 md:p-10">

            <ProfileInfo
              icon={User}
              title="Name"
              value={displayName}
            />

            <ProfileInfo
              icon={Mail}
              title="Email"
              value={email}
            />

            <ProfileInfo
              icon={ShieldCheck}
              title="Account"
              value="Verified Journey Jotter User"
            />

            <ProfileInfo
              icon={CalendarDays}
              title="Member Since"
              value={
                user?.metadata?.creationTime
                  ? new Date(
                      user.metadata.creationTime
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Journey Jotter"
              }
            />

          </div>

        </motion.section>

        {/* ================= STATS ================= */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <StatCard
            icon={Plane}
            title="Trips Planned"
            value={tripCount}
            bg="bg-blue-50"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />

          <StatCard
            icon={Heart}
            title="Travel Companion"
            value="AI Powered"
            bg="bg-cyan-50"
            iconBg="bg-cyan-100"
            iconColor="text-cyan-600"
          />

          <StatCard
            icon={MapPin}
            title="Travel Planning"
            value="Smart"
            bg="bg-violet-50"
            iconBg="bg-violet-100"
            iconColor="text-violet-600"
          />

        </div>

        {/* ================= TRAVEL CTA ================= */}

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
            duration: 0.6,
            delay: 0.25,
          }}
          className="mt-8 rounded-[30px] border border-blue-100 bg-white p-7 shadow-lg md:p-9"
        >

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="flex items-center gap-2 text-blue-600">
                <Sparkles size={20} />

                <span className="font-bold">
                  READY FOR ANOTHER ADVENTURE?
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Plan your next journey
              </h2>

              <p className="mt-1 text-slate-500">
                Let Journey Jotter create a personalized
                itinerary for you.
              </p>

            </div>

            <button
              onClick={() => navigate("/planner")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:scale-[1.02]"
            >
              <Sparkles size={19} />
              Plan a Trip
            </button>

          </div>

        </motion.section>

        {/* ================= LOGOUT ================= */}

        <div className="mt-8 flex justify-center">

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-white px-6 py-3 font-bold text-red-500 shadow-sm transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Log Out
          </button>

        </div>

      </div>
    </div>
  );
}

/* =====================================================
   PROFILE INFO
===================================================== */

function ProfileInfo({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
          <Icon
            size={20}
            className="text-blue-600"
          />
        </div>

        <div className="min-w-0">

          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <p className="mt-1 truncate font-bold text-slate-800">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon: Icon,
  title,
  value,
  bg,
  iconBg,
  iconColor,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className={`rounded-3xl border border-white p-6 shadow-lg ${bg}`}
    >

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}
      >
        <Icon
          size={22}
          className={iconColor}
        />
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-slate-900">
        {value}
      </p>

    </motion.div>
  );
}

export default Profile;