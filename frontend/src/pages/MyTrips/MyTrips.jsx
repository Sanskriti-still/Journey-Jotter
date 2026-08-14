import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Wallet,
  Sparkles,
  ArrowRight,
  Plane,
} from "lucide-react";

function MyTrips() {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const savedTrip = localStorage.getItem(
      "latestJourneyJotterTrip"
    );

    if (savedTrip) {
      try {
        setTrip(JSON.parse(savedTrip));
      } catch (error) {
        console.error("Could not load saved trip:", error);
        setTrip(null);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-10">

          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            <Plane size={16} />
            MY TRIPS
          </span>

          <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Your Journeys
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-slate-500">
            All your recently planned adventures in one place.
          </p>

        </div>

        {/* NO TRIP */}

        {!trip ? (
          <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-xl">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">
              <MapPin
                size={38}
                className="text-blue-600"
              />
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              No trips yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Start planning your first adventure and
              it will appear here.
            </p>

            <Link
              to="/planner"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:scale-[1.02]"
            >
              <Sparkles size={19} />
              Plan a Trip
              <ArrowRight size={18} />
            </Link>

          </div>
        ) : (

          /* SAVED TRIP */

          <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-2xl">

            {/* TOP */}

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-7 text-white md:p-9">

              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                <div>

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur-md">
                    <Sparkles size={15} />
                    AI PLANNED JOURNEY
                  </div>

                  <h2 className="text-3xl font-black md:text-4xl">
                    {trip.destination}
                  </h2>

                  <p className="mt-2 text-white/80">
                    Your personalized travel plan
                  </p>

                </div>

                <Link
                  to="/planner"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-blue-600 transition hover:scale-[1.02]"
                >
                  Plan Another
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

            {/* DETAILS */}

            <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">

              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">

                <CalendarDays
                  size={24}
                  className="text-blue-600"
                />

                <p className="mt-3 text-sm font-semibold text-blue-600">
                  Duration
                </p>

                <p className="mt-1 text-2xl font-black text-slate-900">
                  {trip.days}{" "}
                  {Number(trip.days) === 1
                    ? "Day"
                    : "Days"}
                </p>

              </div>

              <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-5">

                <Wallet
                  size={24}
                  className="text-cyan-600"
                />

                <p className="mt-3 text-sm font-semibold text-cyan-600">
                  Budget
                </p>

                <p className="mt-1 text-2xl font-black text-slate-900">
                  ₹{Number(trip.budget).toLocaleString("en-IN")}
                </p>

              </div>

              <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5">

                <Sparkles
                  size={24}
                  className="text-violet-600"
                />

                <p className="mt-3 text-sm font-semibold text-violet-600">
                  Travel Style
                </p>

                <p className="mt-1 text-2xl font-black text-slate-900">
                  {trip.style}
                </p>

              </div>

            </div>

            {/* TRAVEL TYPE */}

            <div className="px-6 pb-6 md:px-8">

              <div className="rounded-3xl bg-slate-50 p-5">

                <p className="text-sm font-semibold text-slate-400">
                  Travelling with
                </p>

                <p className="mt-1 text-xl font-black text-slate-900">
                  {trip.travelType}
                </p>

              </div>

            </div>

            {/* VIEW TRIP */}

            <div className="border-t border-slate-100 p-6 md:p-8">

              <Link
                to="/planner"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 py-4 font-bold text-white transition hover:bg-slate-800"
              >
                <MapPin size={20} />
                View / Plan Your Journey
                <ArrowRight size={19} />
              </Link>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default MyTrips;