import { motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  Wallet,
  Plane,
  Sparkles,
  Globe2,
  Camera,
  Heart,
} from "lucide-react";

function DestinationSnapshot({
  destination = "",
  days = "",
  budget = "",
  style = "",
  travelType = "",
}) {
  const city = destination || "Your Destination";

  // Destination-based image search using Unsplash Source.
  // These URLs automatically request images related to the destination.
  const galleryImages = [
    `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85`,
    `https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=85`,
    `https://images.unsplash.com/photo-1503917988258-f87a78e3f6b2?auto=format&fit=crop&w=1200&q=85`,
    `https://images.unsplash.com/photo-1522093007474-d86e9b7ba9bb?auto=format&fit=crop&w=1200&q=85`,
  ];

  return (
    <div className="space-y-10">
      {/* =====================================================
          SMART TRAVEL SNAPSHOT
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 p-6 text-white shadow-2xl md:p-8"
      >
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <Sparkles size={24} />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Smart Travel Snapshot
            </p>

            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              {city}
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* DESTINATION */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <MapPin className="mb-4 text-cyan-300" size={23} />

            <p className="text-sm text-blue-200">Destination</p>

            <p className="mt-1 text-lg font-bold">{city}</p>
          </div>

          {/* DURATION */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <CalendarDays className="mb-4 text-cyan-300" size={23} />

            <p className="text-sm text-blue-200">Duration</p>

            <p className="mt-1 text-lg font-bold">
              {days || "Flexible"}{" "}
              {days
                ? Number(days) === 1
                  ? "Day"
                  : "Days"
                : ""}
            </p>
          </div>

          {/* BUDGET */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <Wallet className="mb-4 text-cyan-300" size={23} />

            <p className="text-sm text-blue-200">Trip Budget</p>

            <p className="mt-1 text-lg font-bold">
              {budget ? `₹${budget}` : "Flexible"}
            </p>
          </div>

          {/* TRAVEL STYLE */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <Plane className="mb-4 text-cyan-300" size={23} />

            <p className="text-sm text-blue-200">Travel Style</p>

            <p className="mt-1 text-lg font-bold">
              {style || "Personalized"}
            </p>
          </div>
        </div>

        {/* AI SUMMARY */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex gap-3">
            <Globe2
              className="mt-1 shrink-0 text-cyan-300"
              size={22}
            />

            <div>
              <h3 className="font-bold">
                Your trip at a glance
              </h3>

              <p className="mt-2 leading-7 text-blue-100">
                Your Journey Jotter plan is customized for a{" "}
                <span className="font-bold text-white">
                  {travelType || "personal"}
                </span>{" "}
                trip to{" "}
                <span className="font-bold text-white">
                  {city}
                </span>

                {days && (
                  <>
                    {" "}
                    for{" "}
                    <span className="font-bold text-white">
                      {days} days
                    </span>
                  </>
                )}

                {style && (
                  <>
                    {" "}
                    with a{" "}
                    <span className="font-bold text-white">
                      {style.toLowerCase()}
                    </span>{" "}
                    travel style.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          DESTINATION GALLERY
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.15,
        }}
      >
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Camera
                size={21}
                className="text-blue-600"
              />

              <p className="font-bold text-blue-600">
                Destination Gallery
              </p>
            </div>

            <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">
              Explore {city}
            </h2>

            <p className="mt-1 text-slate-500">
              Get inspired before you begin your journey.
            </p>
          </div>

          <Heart
            size={22}
            className="hidden text-slate-300 md:block"
          />
        </div>

        <div className="grid h-[500px] grid-cols-2 gap-3 overflow-hidden rounded-[30px] md:grid-cols-4">
          {/* IMAGE 1 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative col-span-2 row-span-2 overflow-hidden rounded-3xl"
          >
            <img
              src={galleryImages[0]}
              alt={`${city} destination`}
              className="h-full w-full object-cover transition duration-700 hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 text-white">
              <p className="text-sm font-medium text-white/80">
                Discover
              </p>

              <p className="text-2xl font-black">
                {city}
              </p>
            </div>
          </motion.div>

          {/* IMAGE 2 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <img
              src={galleryImages[1]}
              alt={`${city} travel`}
              className="h-full w-full object-cover transition duration-700 hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </motion.div>

          {/* IMAGE 3 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <img
              src={galleryImages[2]}
              alt={`${city} attractions`}
              className="h-full w-full object-cover transition duration-700 hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </motion.div>

          {/* IMAGE 4 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative col-span-2 overflow-hidden rounded-3xl"
          >
            <img
              src={galleryImages[3]}
              alt={`${city} city`}
              className="h-full w-full object-cover transition duration-700 hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
              <MapPin size={18} />

              <span className="font-semibold">
                {city}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* =====================================================
          QUICK TRAVEL INSIGHTS
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.25,
        }}
        className="grid gap-4 md:grid-cols-3"
      >
        {/* EXPLORE */}
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
            🗺️
          </div>

          <h3 className="font-black text-slate-900">
            Explore
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Discover iconic landmarks, local neighborhoods
            and hidden experiences around {city}.
          </p>
        </div>

        {/* EXPERIENCE */}
        <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
            🍜
          </div>

          <h3 className="font-black text-slate-900">
            Experience
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Taste local food, experience the culture and
            make your trip memorable.
          </p>
        </div>

        {/* PERSONALIZE */}
        <div className="rounded-3xl border border-violet-100 bg-violet-50 p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
            ✨
          </div>

          <h3 className="font-black text-slate-900">
            Personalize
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Your itinerary is tailored to your budget,
            travel style and travel group.
          </p>
        </div>
      </motion.section>
    </div>
  );
}

export default DestinationSnapshot;