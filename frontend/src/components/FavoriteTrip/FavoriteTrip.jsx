import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Check, Trash2, Bookmark } from "lucide-react";

function FavoriteTrip({
  destination = "",
  days = "",
  budget = "",
  style = "",
  travelType = "",
}) {
  const [favorite, setFavorite] = useState(false);
  const [saved, setSaved] = useState(false);

  const storageKey = `journeyJotterFavorite_${destination
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")}`;

  useEffect(() => {
    if (!destination) return;

    const existing = localStorage.getItem(storageKey);

    setFavorite(existing === "true");
  }, [destination, storageKey]);

  const saveTrip = () => {
    if (!destination) return;

    const trip = {
      destination,
      days: Number(days) || 1,
      budget: Number(budget) || 0,
      style,
      travelType,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "journeyJotterSavedTrip",
      JSON.stringify(trip)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const toggleFavorite = () => {
    const newValue = !favorite;

    setFavorite(newValue);

    if (newValue) {
      localStorage.setItem(
        storageKey,
        "true"
      );
    } else {
      localStorage.removeItem(storageKey);
    }
  };

  const removeSavedTrip = () => {
    localStorage.removeItem(
      "journeyJotterSavedTrip"
    );

    setSaved(false);
  };

  if (!destination) {
    return null;
  }

  return (
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
        duration: 0.5,
      }}
      className="mt-8"
    >
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white p-5 shadow-lg md:p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          {/* INFO */}

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100">

              <Bookmark
                size={25}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3 className="font-black text-slate-900">
                Save your journey
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Keep {destination} handy for later.
              </p>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex flex-wrap gap-3">

            {/* FAVORITE */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.95,
              }}
              onClick={toggleFavorite}
              className={`flex items-center gap-2 rounded-2xl border px-5 py-3 font-bold transition ${
                favorite
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
              }`}
            >

              <motion.div
                animate={{
                  scale: favorite
                    ? [1, 1.3, 1]
                    : 1,
                }}
              >
                <Heart
                  size={18}
                  fill={
                    favorite
                      ? "currentColor"
                      : "none"
                  }
                />
              </motion.div>

              {favorite
                ? "Favourite"
                : "Add Favourite"}

            </motion.button>

            {/* SAVE */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.95,
              }}
              onClick={saveTrip}
              className="flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
            >

              {saved ? (
                <>
                  <Check size={18} />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark size={18} />
                  Save Trip
                </>
              )}

            </motion.button>

            {/* REMOVE */}

            {saved && (
              <button
                type="button"
                onClick={removeSavedTrip}
                className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={17} />
                Remove
              </button>
            )}

          </div>

        </div>

        {/* SAVED DETAILS */}

        {saved && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            className="mt-5 overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
          >

            <div className="flex items-center gap-2 font-bold text-emerald-700">

              <Check size={18} />

              Trip saved successfully!

            </div>

            <p className="mt-1 text-sm text-emerald-600">
              {destination} · {days}{" "}
              {Number(days) === 1
                ? "day"
                : "days"}
              {budget
                ? ` · ₹${Number(
                    budget
                  ).toLocaleString("en-IN")}`
                : ""}
            </p>

          </motion.div>
        )}

      </div>
    </motion.section>
  );
}

export default FavoriteTrip;