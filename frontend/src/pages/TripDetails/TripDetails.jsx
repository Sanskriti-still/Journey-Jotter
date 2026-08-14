import { useLocation, useNavigate } from "react-router-dom";

import TripMap from "../../components/Map/TripMap";
import ItineraryCards from "../../components/ItineraryCards/ItineraryCards";

function TripDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* =====================================================
     TRIP NOT FOUND
  ===================================================== */

  if (!state || !state.trip) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">

        <div className="rounded-3xl bg-white p-10 shadow-xl">

          <div className="text-6xl">
            😕
          </div>

          <h1 className="mt-5 text-3xl font-black text-slate-900">
            Trip Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            We couldn't find the selected trip.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  const { trip } = state;

  return (
    <section className="min-h-screen bg-slate-50 py-10">

      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate(-1)}
          className="mb-8 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          ← Back to My Trips
        </button>

        {/* =================================================
            MAIN TRIP CARD
        ================================================= */}

        <div className="overflow-hidden rounded-[32px] bg-white shadow-xl">

          {/* DESTINATION IMAGE */}

          {trip.image ? (
            <img
              src={trip.image}
              alt={trip.destination}
              className="h-64 w-full object-cover md:h-96"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-6xl md:h-96">
              ✈️ 🌍
            </div>
          )}

          <div className="p-6 md:p-10">

            {/* DESTINATION */}

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Your Journey
              </p>

              <h1 className="mt-2 text-4xl font-black text-slate-900 md:text-5xl">
                📍 {trip.destination}
              </h1>

              <p className="mt-2 text-slate-500">
                Your personalized Journey Jotter travel plan.
              </p>
            </div>

            {/* =================================================
                TRIP SUMMARY
            ================================================= */}

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* DAYS */}

              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <div className="text-2xl">
                  📅
                </div>

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

              {/* BUDGET */}

              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                <div className="text-2xl">
                  💰
                </div>

                <p className="mt-3 text-sm font-semibold text-emerald-600">
                  Budget
                </p>

                <p className="mt-1 text-2xl font-black text-slate-900">
                  ₹{trip.budget}
                </p>
              </div>

              {/* STYLE */}

              <div className="rounded-3xl border border-amber-100 bg-amber-50 p-6">
                <div className="text-2xl">
                  🎒
                </div>

                <p className="mt-3 text-sm font-semibold text-amber-600">
                  Travel Style
                </p>

                <p className="mt-1 text-2xl font-black text-slate-900">
                  {trip.style}
                </p>
              </div>

              {/* TRAVEL TYPE */}

              <div className="rounded-3xl border border-violet-100 bg-violet-50 p-6">
                <div className="text-2xl">
                  👥
                </div>

                <p className="mt-3 text-sm font-semibold text-violet-600">
                  Travel Type
                </p>

                <p className="mt-1 text-2xl font-black text-slate-900">
                  {trip.travelType}
                </p>
              </div>

            </div>

            {/* =================================================
                WEATHER
            ================================================= */}

            {trip.weather && (
              <div className="mt-12">

                <div className="mb-5">
                  <p className="text-sm font-bold uppercase tracking-wider text-cyan-600">
                    Destination Preview
                  </p>

                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    🌤 Weather
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                  <div className="rounded-3xl bg-white p-6 shadow-md">
                    <p className="text-sm text-slate-500">
                      Temperature
                    </p>

                    <p className="mt-2 text-2xl font-black text-slate-900">
                      {trip.weather.temperature}°C
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white p-6 shadow-md">
                    <p className="text-sm text-slate-500">
                      Condition
                    </p>

                    <p className="mt-2 text-xl font-black capitalize text-slate-900">
                      {trip.weather.description}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white p-6 shadow-md">
                    <p className="text-sm text-slate-500">
                      Humidity
                    </p>

                    <p className="mt-2 text-2xl font-black text-slate-900">
                      {trip.weather.humidity}%
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white p-6 shadow-md">
                    <p className="text-sm text-slate-500">
                      Wind
                    </p>

                    <p className="mt-2 text-2xl font-black text-slate-900">
                      {trip.weather.wind} m/s
                    </p>
                  </div>

                </div>

              </div>
            )}

            {/* =================================================
                MAP
            ================================================= */}

            {trip.weather?.lat && trip.weather?.lon && (
              <div className="mt-12">

                <div className="mb-5">
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    Explore the destination
                  </p>

                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    🗺️ Destination Map
                  </h2>
                </div>

                <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

                  <TripMap
                    lat={trip.weather.lat}
                    lon={trip.weather.lon}
                    destination={trip.destination}
                  />

                </div>

              </div>
            )}

          </div>

        </div>

        {/* =================================================
            NEW AI ITINERARY
        ================================================= */}

        <div className="mt-12">

          <ItineraryCards
            trip={trip.itinerary}
          />

        </div>

      </div>

    </section>
  );
}

export default TripDetails;

