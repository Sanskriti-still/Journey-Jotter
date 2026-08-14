import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, CalendarDays } from "lucide-react";

function DayMap({ destination, trip }) {
  const [selectedDay, setSelectedDay] = useState(1);

  const dayCount = useMemo(() => {
    if (Array.isArray(trip)) return trip.length;

    if (trip && typeof trip === "object") {
      return Object.keys(trip).filter((key) =>
        key.toLowerCase().includes("day")
      ).length;
    }

    return 0;
  }, [trip]);

  if (!destination || !trip) return null;

  const totalDays = Math.max(dayCount, 1);

  const safeDay = Math.min(
    selectedDay,
    totalDays
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-10"
    >
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">
          <Navigation size={16} />
          DAY-WISE MAP
        </span>

        <h2 className="mt-4 text-3xl font-black text-slate-900">
          Explore your itinerary on the map
        </h2>

        <p className="mt-2 text-slate-500">
          Select a day to explore that part of your journey.
        </p>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">

        {/* DAY SELECTOR */}

        <div className="flex gap-3 overflow-x-auto border-b border-slate-100 p-5">
          {Array.from(
            { length: totalDays },
            (_, index) => index + 1
          ).map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 font-bold transition ${
                safeDay === day
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-200"
                  : "bg-slate-100 text-slate-600 hover:bg-violet-50"
              }`}
            >
              <CalendarDays size={17} />
              Day {day}
            </button>
          ))}
        </div>

        {/* MAP */}

        <div className="relative h-[400px] md:h-[500px]">

          <iframe
            key={`${destination}-${safeDay}`}
            title={`${destination} Day ${safeDay} map`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${destination} Day ${safeDay}`
            )}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
              <MapPin
                size={20}
                className="text-violet-600"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400">
                CURRENT ITINERARY
              </p>

              <p className="font-black text-slate-900">
                Day {safeDay} · {destination}
              </p>
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}

export default DayMap;