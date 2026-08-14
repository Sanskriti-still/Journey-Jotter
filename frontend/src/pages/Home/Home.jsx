import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import PrimaryButton from "../../components/UI/PrimaryButton";
import GlassCard from "../../components/UI/GlassCard";
import SectionHeading from "../../components/UI/SectionHeading";
import DestinationCard from "../../components/UI/DestinationCard";

function Home() {
  const destinations = [
    {
      title: "Goa",
      country: "India",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop",
    },
    {
      title: "Bali",
      country: "Indonesia",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900",
    },
    {
      title: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900",
    },
    {
      title: "Kashmir",
      country: "India",
      image:
        "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100">

      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-5 py-2 font-semibold">
              🌍 AI Powered Travel Planner
            </span>

            <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight text-slate-900">
              Plan Less.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Explore More.
              </span>
            </h1>

            <p className="mt-8 text-xl text-slate-600 leading-9">
              Journey Jotter creates intelligent travel itineraries,
              discovers hidden gems, suggests packing essentials,
              estimates budgets and helps you travel smarter with AI.
            </p>

            <div className="flex gap-5 mt-12 flex-wrap">

              <Link to="/planner">
                <PrimaryButton>
                  ✨ Create My Dream Journey
                </PrimaryButton>
              </Link>

              <Link
                to="/dashboard"
                className="px-7 py-3 rounded-2xl border-2 border-blue-600 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                📊 Dashboard
              </Link>

            </div>

            <div className="flex items-center gap-10 mt-14">

              <div>
                <h2 className="text-3xl font-bold text-blue-600">
                  100+
                </h2>

                <p className="text-gray-500">
                  Destinations
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">
                  AI
                </h2>

                <p className="text-gray-500">
                  Smart Planning
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">
                  24/7
                </h2>

                <p className="text-gray-500">
                  Available
                </p>
              </div>

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
              className="rounded-[35px] shadow-2xl"
              alt="Travel"
            />

            <div className="absolute -bottom-8 -left-8">
              <GlassCard>

                <h3 className="text-xl font-bold">
                  ✈ AI Travel Score
                </h3>

                <p className="text-4xl font-black text-blue-600 mt-3">
                  98%
                </p>

                <p className="text-gray-500 mt-2">
                  Personalized Recommendations
                </p>

              </GlassCard>
            </div>

          </motion.div>

        </div>
                {/* ================= FEATURES ================= */}

        <div className="mt-40">

          <SectionHeading
            title="Why Choose Journey Jotter?"
            subtitle="Everything you need for your next adventure in one intelligent platform."
          />

          <div className="grid md:grid-cols-3 gap-8">

            <GlassCard>

              <div className="text-6xl">
                🤖
              </div>

              <h3 className="text-2xl font-bold mt-6">
                AI Itinerary
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                Generate a complete day-wise itinerary with
                sightseeing, food recommendations, timings
                and hidden gems in seconds.
              </p>

            </GlassCard>

            <GlassCard>

              <div className="text-6xl">
                🌦
              </div>

              <h3 className="text-2xl font-bold mt-6">
                Live Weather
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                Check the latest weather forecast before
                planning your trip and receive travel tips
                accordingly.
              </p>

            </GlassCard>

            <GlassCard>

              <div className="text-6xl">
                💰
              </div>

              <h3 className="text-2xl font-bold mt-6">
                Budget Planner
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                Estimate travel expenses, split group costs
                and keep your journey affordable.
              </p>

            </GlassCard>

          </div>

        </div>

        {/* ================= DESTINATIONS ================= */}

        <div className="mt-40">

          <SectionHeading
            title="Trending Destinations"
            subtitle="Popular places loved by travelers around the world."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {destinations.map((place) => (

              <DestinationCard
                key={place.title}
                title={place.title}
                country={place.country}
                image={place.image}
                onClick={() => {}}
              />

            ))}

          </div>

        </div>

        {/* ================= STATS ================= */}

        <div className="mt-40">

          <div className="grid md:grid-cols-4 gap-8">

            <GlassCard className="text-center">

              <h2 className="text-5xl font-black text-blue-600">
                100+
              </h2>

              <p className="mt-3 text-gray-600">
                Destinations
              </p>

            </GlassCard>

            <GlassCard className="text-center">

              <h2 className="text-5xl font-black text-blue-600">
                5000+
              </h2>

              <p className="mt-3 text-gray-600">
                AI Trips Planned
              </p>

            </GlassCard>

            <GlassCard className="text-center">

              <h2 className="text-5xl font-black text-blue-600">
                24/7
              </h2>

              <p className="mt-3 text-gray-600">
                AI Assistant
              </p>

            </GlassCard>

            <GlassCard className="text-center">

              <h2 className="text-5xl font-black text-blue-600">
                4.9★
              </h2>

              <p className="mt-3 text-gray-600">
                User Rating
              </p>

            </GlassCard>

          </div>

        </div>
                {/* ================= FINAL CTA ================= */}

        <div className="mt-40">

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <div className="rounded-[40px] bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 p-14 text-center text-white shadow-2xl">

              <h2 className="text-5xl font-black">
                Your Next Adventure Starts Here ✈
              </h2>

              <p className="text-xl mt-8 max-w-3xl mx-auto leading-9 text-blue-100">
                Let Journey Jotter plan everything for you —
                personalized itineraries, smart budgets,
                hidden gems, weather insights, nearby attractions
                and much more.
              </p>

              <div className="mt-12">

                <Link to="/planner">

                  <PrimaryButton className="bg-white !text-blue-600 hover:scale-105">
                    🚀 Start Planning Now
                  </PrimaryButton>

                </Link>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}

export default Home;