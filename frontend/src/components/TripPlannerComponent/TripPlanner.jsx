import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { generateTrip } from "../../services/gemini";

function TripPlanner() {
  const resultRef = useRef(null);
  const loadingRef = useRef(null);

  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("Adventure");
  const [travelType, setTravelType] = useState("Solo");

  const [trip, setTrip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  const [mapLocation, setMapLocation] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState("");

  const [favorite, setFavorite] = useState(false);
  const [activeSection, setActiveSection] = useState("itinerary");

  const [packingList, setPackingList] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const [people, setPeople] = useState(1);
  const [extraExpenses, setExtraExpenses] = useState("");

  const [assistantQuestion, setAssistantQuestion] = useState("");
  const [assistantAnswer, setAssistantAnswer] = useState("");
  const [assistantLoading, setAssistantLoading] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const destinations = [
    "Goa, India",
    "Manali, India",
    "Jaipur, India",
    "Mumbai, India",
    "Delhi, India",
    "Kashmir, India",
    "Kerala, India",
    "Rishikesh, India",
    "Agra, India",
    "Udaipur, India",
    "Paris, France",
    "London, United Kingdom",
    "Dubai, UAE",
    "Tokyo, Japan",
    "Bali, Indonesia",
    "Singapore",
    "New York, USA",
    "Rome, Italy",
    "Barcelona, Spain",
    "Bangkok, Thailand",
    "Switzerland",
  ];

  const suggestions = destinations
    .filter((place) =>
      place.toLowerCase().includes(destination.toLowerCase())
    )
    .slice(0, 6);

  /* =========================================================
     SCROLL TO LOADING AREA
  ========================================================= */

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        loadingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [loading]);

  /* =========================================================
     WEATHER + MAP
  ========================================================= */

  const fetchWeatherAndMap = async (place) => {
    if (!place.trim()) return;

    setWeatherLoading(true);
    setMapLoading(true);
    setWeatherError("");
    setMapError("");

    let latitude = null;
    let longitude = null;
    let location = null;

    try {
      /* ---------------- GEOCODING ---------------- */

      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          place
        )}&count=1&language=en&format=json`
      );

      if (!geoResponse.ok) {
        throw new Error("Unable to find destination");
      }

      const geoData = await geoResponse.json();

      if (!geoData.results?.length) {
        throw new Error("Destination not found");
      }

      location = geoData.results[0];

      latitude = Number(location.latitude);
      longitude = Number(location.longitude);

      /* ---------------- MAP ---------------- */

      setMapLocation({
        latitude,
        longitude,
        name: location.name,
        country: location.country,
      });

      setMapLoading(false);

      /* ---------------- WEATHER ---------------- */

      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7`
        );

        if (!weatherResponse.ok) {
          throw new Error("Weather unavailable");
        }

        const weatherData = await weatherResponse.json();

        setWeather({
          ...weatherData,
          locationName: location.name,
          country: location.country,
        });
      } catch (weatherErr) {
        console.error("Weather error:", weatherErr);
        setWeather(null);
        setWeatherError(
          "Weather is temporarily unavailable, but your map is still ready."
        );
      }
    } catch (err) {
      console.error("Location error:", err);

      setMapLocation(null);
      setWeather(null);

      setMapError(
        "We couldn't locate this destination. Try a city name such as Goa, Paris or Tokyo."
      );

      setWeatherError("Weather could not be loaded.");
    } finally {
      setWeatherLoading(false);
      setMapLoading(false);
    }
  };

  const weatherDescription = (code) => {
    if (code === 0) return "Clear sky";
    if ([1, 2, 3].includes(code)) return "Partly cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([61, 63, 65].includes(code)) return "Rain";
    if ([71, 73, 75].includes(code)) return "Snow";
    if ([80, 81, 82].includes(code)) return "Rain showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";

    return "Pleasant weather";
  };

  const weatherIcon = (code) => {
    if (code === 0) return "☀️";
    if ([1, 2, 3].includes(code)) return "🌤️";
    if ([45, 48].includes(code)) return "🌫️";

    if (
      [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)
    ) {
      return "🌧️";
    }

    if ([71, 73, 75].includes(code)) return "❄️";
    if ([95, 96, 99].includes(code)) return "⛈️";

    return "🌤️";
  };

  /* =========================================================
     PACKING
  ========================================================= */

  const createPackingList = () => {
    const items = [
      "Travel documents",
      "Phone & charger",
      "Power bank",
      "Wallet",
      "Basic medicines",
      "Toiletries",
      "Comfortable clothes",
      "Comfortable shoes",
      "Sunglasses",
      "Water bottle",
    ];

    const lower = destination.toLowerCase();

    if (
      style === "Adventure" ||
      style === "Nature" ||
      lower.includes("manali") ||
      lower.includes("kashmir")
    ) {
      items.push(
        "Hiking shoes",
        "Small backpack",
        "Light jacket",
        "First-aid kit"
      );
    }

    if (
      style === "Beach" ||
      lower.includes("goa") ||
      lower.includes("bali")
    ) {
      items.push(
        "Swimwear",
        "Sunscreen",
        "Beach towel",
        "Flip-flops"
      );
    }

    if (travelType === "Family") {
      items.push(
        "Snacks",
        "Extra essentials",
        "Entertainment"
      );
    }

    setPackingList([...new Set(items)]);
  };

  /* =========================================================
     SHOPPING
  ========================================================= */

  const createShoppingList = () => {
    let items = [];

    if (style === "Adventure") {
      items = [
        "Travel backpack",
        "Power bank",
        "Walking shoes",
        "Reusable water bottle",
      ];
    } else if (style === "Luxury") {
      items = [
        "Travel organizer",
        "Premium luggage accessories",
        "Travel fragrance",
        "Formal outfit",
      ];
    } else if (style === "Food") {
      items = [
        "Local food souvenirs",
        "Reusable food container",
        "Travel bottle",
        "Local snacks",
      ];
    } else if (style === "Nature") {
      items = [
        "Hiking shoes",
        "Small backpack",
        "Sunscreen",
        "Reusable bottle",
      ];
    } else {
      items = [
        "Comfortable shoes",
        "Travel backpack",
        "Power bank",
        "Sunglasses",
      ];
    }

    setShoppingList(items);
  };

  /* =========================================================
     GENERATE TRIP
  ========================================================= */

  const handleGenerateTrip = async (e) => {
    e.preventDefault();

    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }

    setLoading(true);
    setError("");
    setTrip("");
    setWeather(null);
    setMapLocation(null);
    setAssistantAnswer("");
    setActiveSection("itinerary");

    try {
      const result = await generateTrip({
        destination,
        days,
        budget,
        style,
        travelType,
      });

      let cleaned = result;

      if (typeof result === "object") {
        cleaned =
          result.text ||
          result.output ||
          result.content ||
          JSON.stringify(result);
      }

      const finalTrip = String(cleaned);

      setTrip(finalTrip);

      createPackingList();
      createShoppingList();

      await fetchWeatherAndMap(destination);

      const existingTrips =
        JSON.parse(
          localStorage.getItem("journeyJotterTrips")
        ) || [];

      const newTrip = {
        id: Date.now(),
        destination,
        days,
        budget,
        style,
        travelType,
        itinerary: finalTrip,
        favorite: false,
        date: new Date().toISOString(),
      };

      localStorage.setItem(
        "journeyJotterTrips",
        JSON.stringify([
          newTrip,
          ...existingTrips,
        ])
      );

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 400);
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Unable to generate your trip. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FAVORITE
  ========================================================= */

  const toggleFavorite = () => {
    const newValue = !favorite;

    setFavorite(newValue);

    const trips =
      JSON.parse(
        localStorage.getItem("journeyJotterTrips")
      ) || [];

    if (trips.length > 0) {
      trips[0].favorite = newValue;

      localStorage.setItem(
        "journeyJotterTrips",
        JSON.stringify(trips)
      );
    }
  };

  /* =========================================================
     BUDGET
  ========================================================= */

  const calculatePerPerson = () => {
    const main =
      Number(
        String(budget).replace(/[^0-9]/g, "")
      ) || 0;

    const extra =
      Number(
        String(extraExpenses).replace(/[^0-9]/g, "")
      ) || 0;

    return Math.round(
      (main + extra) / Math.max(people, 1)
    );
  };

  /* =========================================================
     AI ASSISTANT
  ========================================================= */

  const askAssistant = async () => {
    if (!assistantQuestion.trim()) return;

    setAssistantLoading(true);
    setAssistantAnswer("");

    try {
      const response = await generateTrip({
        destination,
        days,
        budget,
        style,
        travelType,
        question: assistantQuestion,
      });

      let answer = response;

      if (typeof response === "object") {
        answer =
          response.text ||
          response.output ||
          response.content ||
          JSON.stringify(response);
      }

      setAssistantAnswer(String(answer));
    } catch (err) {
      console.error(err);

      setAssistantAnswer(
        "Sorry, I couldn't answer that right now."
      );
    } finally {
      setAssistantLoading(false);
    }
  };

  /* =========================================================
     MAP URL
  ========================================================= */

  const mapUrl = useMemo(() => {
    if (!mapLocation) return "";

    const { latitude, longitude } = mapLocation;

    const bbox = [
      longitude - 0.15,
      latitude - 0.1,
      longitude + 0.15,
      latitude + 0.1,
    ]
      .map((value) => value.toFixed(5))
      .join("%2C");

    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  }, [mapLocation]);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const goTo = (section) => {
    setActiveSection(section);

    document
      .getElementById(`section-${section}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /* =========================================================
     DAY CARDS
  ========================================================= */

  const dayCards = useMemo(() => {
    if (!trip) return [];

    const lines = trip.split("\n");
    const cards = [];
    let current = null;

    lines.forEach((line) => {
      const match = line.match(
        /^(?:#+\s*)?(?:📅\s*)?Day\s*(\d+)/i
      );

      if (match) {
        if (current) cards.push(current);

        current = {
          day: Number(match[1]),
          content: [],
        };

        return;
      }

      if (current) {
        current.content.push(line);
      }
    });

    if (current) cards.push(current);

    return cards.slice(0, Number(days));
  }, [trip, days]);

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[850px] overflow-hidden">

        {/* Ambient background */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.10),transparent_35%)]" />

        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute top-20 -right-48 w-[650px] h-[650px] rounded-full bg-violet-600/10 blur-[160px]" />

        {/* Navbar */}

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-7">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xl flex items-center justify-center text-2xl shadow-xl">
                🌍
              </div>

              <div>
                <p className="font-black text-lg tracking-tight">
                  Journey Jotter
                </p>

                <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500">
                  AI Travel Companion
                </p>
              </div>

            </div>

            {trip && (
              <button
                onClick={toggleFavorite}
                className="px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl hover:bg-white/10 transition font-semibold"
              >
                {favorite
                  ? "❤️ Saved"
                  : "♡ Save Trip"}
              </button>
            )}

          </div>

        </div>

        {/* Hero */}

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-24 md:pt-28 pb-24">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/[0.07] border border-cyan-300/10 text-cyan-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              AI-powered trip planning
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-[-0.04em] leading-[0.9] mt-8">

              Go somewhere

              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400">
                unforgettable.
              </span>

            </h1>

            <p className="text-base md:text-xl text-slate-400 max-w-2xl mt-8 leading-relaxed">
              Your destination, your style, your adventure.
              Let Journey Jotter create the complete trip
              around you.
            </p>

          </motion.div>

          {/* Planning Card */}

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="mt-14"
          >

            <form
              onSubmit={handleGenerateTrip}
              className="relative bg-[#101827]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-5 md:p-7 shadow-[0_35px_100px_rgba(0,0,0,0.45)]"
            >

              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

              <div className="relative grid md:grid-cols-2 lg:grid-cols-5 gap-4">

                {/* Destination */}

                <div className="lg:col-span-2 relative">

                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Destination
                  </label>

                  <div className="relative mt-2">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                      📍
                    </span>

                    <input
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() =>
                        setShowSuggestions(true)
                      }
                      placeholder="Where do you want to go?"
                      className="w-full bg-white/[0.05] border border-white/10 text-white rounded-2xl pl-12 pr-4 py-4 outline-none placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5 transition"
                    />

                  </div>

                  {showSuggestions &&
                    destination &&
                    suggestions.length > 0 && (
                      <div className="absolute z-50 left-0 right-0 top-[78px] bg-[#111a2b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                        {suggestions.map((place) => (
                          <button
                            type="button"
                            key={place}
                            onClick={() => {
                              setDestination(place);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left px-5 py-3.5 text-slate-300 hover:bg-white/5 hover:text-white transition"
                          >
                            📍 {place}
                          </button>
                        ))}

                      </div>
                    )}

                </div>

                {/* Days */}

                <div>

                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Duration
                  </label>

                  <select
                    value={days}
                    onChange={(e) =>
                      setDays(Number(e.target.value))
                    }
                    className="mt-2 w-full bg-white/[0.05] border border-white/10 text-white rounded-2xl px-4 py-4 outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(
                      (day) => (
                        <option
                          key={day}
                          value={day}
                          className="bg-[#101827]"
                        >
                          {day} {day === 1 ? "Day" : "Days"}
                        </option>
                      )
                    )}
                  </select>

                </div>

                {/* Budget */}

                <div>

                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Budget
                  </label>

                  <input
                    value={budget}
                    onChange={(e) =>
                      setBudget(e.target.value)
                    }
                    placeholder="₹20,000"
                    className="mt-2 w-full bg-white/[0.05] border border-white/10 text-white rounded-2xl px-4 py-4 outline-none placeholder:text-slate-600 focus:border-cyan-400/50 transition"
                  />

                </div>

                {/* Style */}

                <div>

                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Travel Style
                  </label>

                  <select
                    value={style}
                    onChange={(e) =>
                      setStyle(e.target.value)
                    }
                    className="mt-2 w-full bg-white/[0.05] border border-white/10 text-white rounded-2xl px-4 py-4 outline-none"
                  >
                    <option className="bg-[#101827]">
                      Adventure
                    </option>
                    <option className="bg-[#101827]">
                      Luxury
                    </option>
                    <option className="bg-[#101827]">
                      Nature
                    </option>
                    <option className="bg-[#101827]">
                      Food
                    </option>
                    <option className="bg-[#101827]">
                      Family
                    </option>
                    <option className="bg-[#101827]">
                      Backpacking
                    </option>
                    <option className="bg-[#101827]">
                      Beach
                    </option>
                  </select>

                </div>

              </div>

              <div className="relative grid md:grid-cols-2 gap-4 mt-4">

                {/* Travel Type */}

                <div>

                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Travelling With
                  </label>

                  <select
                    value={travelType}
                    onChange={(e) =>
                      setTravelType(e.target.value)
                    }
                    className="mt-2 w-full bg-white/[0.05] border border-white/10 text-white rounded-2xl px-4 py-4 outline-none"
                  >
                    <option className="bg-[#101827]">
                      Solo
                    </option>
                    <option className="bg-[#101827]">
                      Friends
                    </option>
                    <option className="bg-[#101827]">
                      Family
                    </option>
                    <option className="bg-[#101827]">
                      Couple
                    </option>
                  </select>

                </div>

                {/* Generate */}

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-black text-lg hover:shadow-[0_15px_45px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 transition disabled:opacity-60"
                >
                  {loading
                    ? "✨ Creating your journey..."
                    : "Plan My Trip  →"}
                </button>

              </div>

              {error && (
                <div className="relative mt-4 bg-red-500/10 border border-red-400/20 text-red-300 rounded-xl p-4">
                  ⚠️ {error}
                </div>
              )}

            </form>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          LOADING / PROGRESS
      ===================================================== */}

      {loading && (
        <section
          ref={loadingRef}
          className="relative min-h-[700px] bg-[#050816] text-white flex items-center justify-center overflow-hidden scroll-mt-4"
        >

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.12),transparent_35%)]" />

          <div className="relative text-center px-6 max-w-3xl">

            <motion.div
              animate={{
                y: [-12, 12, -12],
                rotate: [-4, 4, -4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="text-8xl"
            >
              ✈️
            </motion.div>

            <p className="text-cyan-400 uppercase tracking-[0.4em] text-xs font-bold mt-10">
              Journey Jotter AI
            </p>

            <h2 className="text-5xl md:text-7xl font-black mt-5 leading-tight">
              Your adventure
              <br />
              is taking shape.
            </h2>

            <p className="text-slate-500 text-lg mt-6">
              Creating your personalized journey to{" "}
              <span className="text-slate-300">
                {destination}
              </span>
              ...
            </p>

            <div className="mt-12 max-w-md mx-auto">

              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">

                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-full w-1/2 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full"
                />

              </div>

            </div>

            <div className="flex justify-center gap-2 mt-8">

              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                />
              ))}

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          RESULTS
      ===================================================== */}

      {trip && !loading && (
        <main
          ref={resultRef}
          className="bg-[#050816] px-5 md:px-8 pb-28"
        >

          <div className="max-w-7xl mx-auto">

            {/* Destination Banner */}

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mt-[-65px] z-10 rounded-[2rem] overflow-hidden bg-[#0d1728] border border-white/10 p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
            >

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.16),transparent_30%)]" />

              <div className="relative flex flex-col lg:flex-row justify-between gap-8">

                <div>

                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]">
                    Your journey awaits
                  </p>

                  <h2 className="text-4xl md:text-7xl font-black mt-3 tracking-tight">
                    {destination}
                  </h2>

                  <div className="flex flex-wrap gap-3 mt-6">

                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      📅 {days} Days
                    </span>

                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      ✨ {style}
                    </span>

                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      👥 {travelType}
                    </span>

                    {budget && (
                      <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        💰 {budget}
                      </span>
                    )}

                  </div>

                </div>

                <div className="flex items-end">

                  <button
                    onClick={toggleFavorite}
                    className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-cyan-50 transition"
                  >
                    {favorite
                      ? "❤️ Trip Saved"
                      : "♡ Save Trip"}
                  </button>

                </div>

              </div>

            </motion.section>

            {/* =================================================
                NAVIGATION
            ================================================= */}

            <div className="sticky top-3 z-50 mt-6 bg-[#0d1728]/90 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-2xl overflow-x-auto">

              <div className="flex gap-1 min-w-max">

                {[
                  ["itinerary", "🗓️ Plan"],
                  ["weather", "☀️ Weather"],
                  ["map", "🗺️ Map"],
                  ["gallery", "📸 Gallery"],
                  ["explore", "📍 Explore"],
                  ["packing", "🎒 Packing"],
                  ["shopping", "🛍️ Shop"],
                  ["budget", "💰 Budget"],
                  ["assistant", "🤖 AI"],
                ].map(([id, label]) => (

                  <button
                    key={id}
                    onClick={() => goTo(id)}
                    className={`px-5 py-3 rounded-xl text-sm font-bold transition ${
                      activeSection === id
                        ? "bg-white text-slate-900 shadow-lg"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>

                ))}

              </div>

            </div>

            {/* =================================================
                ITINERARY
            ================================================= */}

            <section
              id="section-itinerary"
              className="pt-24 scroll-mt-24"
            >

              <div className="mb-10">

                <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
                  Your adventure
                </p>

                <h3 className="text-4xl md:text-5xl font-black mt-3">
                  Your trip, day by day.
                </h3>

                <p className="text-slate-500 mt-3 max-w-xl">
                  A personalized itinerary built around
                  your destination, budget and travel style.
                </p>

              </div>

              {dayCards.length > 0 ? (

                <div className="space-y-8">

                  {dayCards.map((day, index) => (

                    <motion.div
                      key={day.day}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                      className="group"
                    >

                      <div className="flex gap-5 md:gap-8">

                        {/* Timeline */}

                        <div className="hidden md:flex flex-col items-center">

                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-violet-600 text-white flex items-center justify-center font-black text-lg shadow-[0_10px_35px_rgba(59,130,246,0.25)]">
                            {String(day.day).padStart(
                              2,
                              "0"
                            )}
                          </div>

                          {index !==
                            dayCards.length - 1 && (
                            <div className="w-px flex-1 bg-gradient-to-b from-blue-500/60 to-transparent mt-3" />
                          )}

                        </div>

                        {/* Card */}

                        <div className="flex-1 bg-[#0d1728] border border-white/[0.07] rounded-[2rem] overflow-hidden shadow-xl hover:border-cyan-400/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition">

                          <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

                          <div className="p-7 md:p-9">

                            <div className="flex items-center gap-4">

                              <div className="md:hidden w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 text-white flex items-center justify-center font-black">
                                {day.day}
                              </div>

                              <div>

                                <p className="text-cyan-400 text-xs font-black uppercase tracking-widest">
                                  Day {day.day}
                                </p>

                                <h4 className="text-2xl md:text-3xl font-black mt-1">
                                  {day.day === 1
                                    ? "The adventure begins"
                                    : day.day === days
                                    ? "Make it memorable"
                                    : "Discover & explore"}
                                </h4>

                              </div>

                            </div>

                            <div className="mt-8 prose prose-invert max-w-none prose-headings:text-white prose-headings:font-black prose-p:text-slate-400 prose-li:text-slate-400 prose-strong:text-white prose-a:text-cyan-400 prose-table:text-slate-300 prose-th:text-white prose-td:border-white/10 prose-th:border-white/10">

                              <ReactMarkdown>
                                {day.content.join("\n")}
                              </ReactMarkdown>

                            </div>

                          </div>

                        </div>

                      </div>

                    </motion.div>

                  ))}

                </div>

              ) : (

                <div className="bg-[#0d1728] rounded-[2rem] border border-white/10 p-8 md:p-10">

                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>
                      {trip}
                    </ReactMarkdown>
                  </div>

                </div>

              )}

            </section>

            {/* =================================================
                WEATHER
            ================================================= */}

            <section
              id="section-weather"
              className="pt-24 scroll-mt-24"
            >

              <div className="mb-9">

                <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
                  Before you go
                </p>

                <h3 className="text-4xl md:text-5xl font-black mt-3">
                  What will the sky look like?
                </h3>

              </div>

              {weatherLoading ? (

                <div className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-cyan-600 p-12 text-white text-center">

                  <div className="text-6xl animate-bounce">
                    ☀️
                  </div>

                  <h4 className="text-2xl font-black mt-5">
                    Checking the weather...
                  </h4>

                </div>

              ) : weather ? (

                <div className="space-y-5">

                  <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 text-white p-8 md:p-10">

                    <div className="absolute right-[-40px] top-[-70px] text-[220px] opacity-10">
                      {weatherIcon(
                        weather.current.weather_code
                      )}
                    </div>

                    <div className="relative">

                      <div className="flex flex-col md:flex-row justify-between gap-8">

                        <div>

                          <p className="text-blue-200">
                            Current conditions
                          </p>

                          <h4 className="text-3xl font-black mt-2">
                            {weather.locationName}
                          </h4>

                          <p className="text-blue-200 mt-2">
                            {weatherDescription(
                              weather.current.weather_code
                            )}
                          </p>

                        </div>

                        <div className="flex items-center gap-5">

                          <span className="text-6xl">
                            {weatherIcon(
                              weather.current.weather_code
                            )}
                          </span>

                          <div>

                            <p className="text-6xl font-black">
                              {Math.round(
                                weather.current
                                  .temperature_2m
                              )}
                              °
                            </p>

                            <p className="text-blue-200">
                              Feels like{" "}
                              {Math.round(
                                weather.current
                                  .apparent_temperature
                              )}
                              °C
                            </p>

                          </div>

                        </div>

                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">

                        {[
                          [
                            "💧",
                            "Humidity",
                            `${weather.current.relative_humidity_2m}%`,
                          ],
                          [
                            "💨",
                            "Wind",
                            `${Math.round(
                              weather.current
                                .wind_speed_10m
                            )} km/h`,
                          ],
                          [
                            "📅",
                            "Duration",
                            `${days} days`,
                          ],
                          [
                            "🌍",
                            "Country",
                            weather.country,
                          ],
                        ].map(
                          ([icon, label, value]) => (

                            <div
                              key={label}
                              className="bg-white/10 backdrop-blur-md rounded-2xl p-4"
                            >

                              <span>{icon}</span>

                              <p className="text-blue-200 text-xs mt-2">
                                {label}
                              </p>

                              <p className="font-black text-lg">
                                {value}
                              </p>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                  <div className="bg-[#0d1728] rounded-[2rem] border border-white/10 p-7 md:p-9">

                    <div className="flex justify-between items-center mb-6">

                      <h4 className="text-2xl font-black">
                        7-Day Forecast
                      </h4>

                      <span className="text-sm text-slate-500">
                        Forecast
                      </span>

                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">

                      {weather.daily.time.map(
                        (date, index) => (

                          <div
                            key={date}
                            className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 hover:bg-white/[0.07] transition"
                          >

                            <p className="text-xs font-bold text-slate-500">
                              {new Date(
                                date
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  weekday: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>

                            <div className="text-3xl mt-4">
                              {weatherIcon(
                                weather.daily
                                  .weather_code[index]
                              )}
                            </div>

                            <p className="text-2xl font-black mt-3">
                              {Math.round(
                                weather.daily
                                  .temperature_2m_max[
                                  index
                                ]
                              )}
                              °
                            </p>

                            <p className="text-xs text-slate-500">
                              Low{" "}
                              {Math.round(
                                weather.daily
                                  .temperature_2m_min[
                                  index
                                ]
                              )}
                              °
                            </p>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                </div>

              ) : (

                <div className="bg-[#0d1728] rounded-[2rem] border border-white/10 p-10">

                  <div className="text-5xl">
                    🌤️
                  </div>

                  <h4 className="text-2xl font-black mt-5">
                    Weather unavailable
                  </h4>

                  <p className="text-slate-500 mt-2">
                    {weatherError ||
                      "Weather information could not be loaded."}
                  </p>

                </div>

              )}

            </section>

            {/* =================================================
                MAP
            ================================================= */}

            <section
              id="section-map"
              className="pt-24 scroll-mt-24"
            >

              <div className="mb-9">

                <p className="text-violet-400 text-xs font-black uppercase tracking-[0.3em]">
                  Find your way
                </p>

                <h3 className="text-4xl md:text-5xl font-black mt-3">
                  Explore your destination.
                </h3>

              </div>

              <div className="rounded-[2rem] overflow-hidden bg-[#0d1728] border border-white/10 shadow-2xl">

                {mapLoading ? (

                  <div className="h-[520px] bg-[#09101d] flex flex-col items-center justify-center">

                    <div className="text-7xl animate-bounce">
                      🗺️
                    </div>

                    <p className="font-black text-xl mt-5">
                      Finding {destination}...
                    </p>

                    <p className="text-slate-500 mt-2">
                      Preparing your destination map
                    </p>

                  </div>

                ) : mapLocation ? (

                  <>

                    <div className="h-[520px] bg-slate-900">

                      <iframe
                        title="Journey Jotter Destination Map"
                        src={mapUrl}
                        className="w-full h-full border-0"
                        loading="lazy"
                      />

                    </div>

                    <div className="p-6 md:p-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

                      <div>

                        <div className="flex items-center gap-3">

                          <span className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-400/10 flex items-center justify-center">
                            📍
                          </span>

                          <div>

                            <p className="font-black text-xl">
                              {mapLocation.name}
                            </p>

                            <p className="text-slate-500">
                              {mapLocation.country}
                            </p>

                          </div>

                        </div>

                      </div>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${mapLocation.latitude},${mapLocation.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-cyan-50 transition"
                      >
                        Open Google Maps ↗
                      </a>

                    </div>

                  </>

                ) : (

                  <div className="h-[520px] bg-[#09101d] flex items-center justify-center text-center p-8">

                    <div>

                      <div className="text-6xl">
                        🗺️
                      </div>

                      <h4 className="text-2xl font-black mt-5">
                        Map unavailable
                      </h4>

                      <p className="text-slate-500 mt-2 max-w-md">
                        {mapError ||
                          "Map location could not be loaded."}
                      </p>

                    </div>

                  </div>

                )}

              </div>

            </section>

            {/* =================================================
                GALLERY
            ================================================= */}

            <section
              id="section-gallery"
              className="pt-24 scroll-mt-24"
            >

              <div className="mb-9">

                <p className="text-pink-400 text-xs font-black uppercase tracking-[0.3em]">
                  Get inspired
                </p>

                <h3 className="text-4xl md:text-5xl font-black mt-3">
                  Imagine yourself there.
                </h3>

              </div>

              <div className="grid md:grid-cols-4 gap-4 h-auto md:h-[500px]">

                <div className="md:col-span-2 md:row-span-2 rounded-[2rem] overflow-hidden group">

                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85"
                    alt="Travel destination"
                    className="w-full h-full min-h-[250px] object-cover group-hover:scale-105 transition duration-700"
                  />

                </div>

                <div className="rounded-[2rem] overflow-hidden group">

                  <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85"
                    alt="Travel landscape"
                    className="w-full h-full min-h-[220px] object-cover group-hover:scale-105 transition duration-700"
                  />

                </div>

                <div className="rounded-[2rem] overflow-hidden group">

                  <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85"
                    alt="Mountain destination"
                    className="w-full h-full min-h-[220px] object-cover group-hover:scale-105 transition duration-700"
                  />

                </div>

                <div className="md:col-span-2 rounded-[2rem] overflow-hidden group">

                  <img
                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=85"
                    alt="Travel experience"
                    className="w-full h-full min-h-[220px] object-cover group-hover:scale-105 transition duration-700"
                  />

                </div>

              </div>

            </section>

            {/* =================================================
                EXPLORE
            ================================================= */}

            <section
              id="section-explore"
              className="pt-24 scroll-mt-24"
            >

              <div className="mb-9">

                <p className="text-orange-400 text-xs font-black uppercase tracking-[0.3em]">
                  Discover
                </p>

                <h3 className="text-4xl md:text-5xl font-black mt-3">
                  More than just sightseeing.
                </h3>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {[
                  [
                    "🏛️",
                    "Iconic Attractions",
                    "Places you absolutely shouldn't miss.",
                  ],
                  [
                    "🌿",
                    "Nature & Views",
                    "Beautiful spots to slow down and explore.",
                  ],
                  [
                    "🍜",
                    "Local Food",
                    "Taste what makes the destination special.",
                  ],
                  [
                    "🛍️",
                    "Shopping",
                    "Markets, souvenirs and local finds.",
                  ],
                  [
                    "📸",
                    "Photo Spots",
                    "Perfect locations for your travel memories.",
                  ],
                  [
                    "💎",
                    "Hidden Gems",
                    "Experiences beyond the usual tourist route.",
                  ],
                ].map(([icon, title, text]) => (

                  <motion.div
                    key={title}
                    whileHover={{ y: -6 }}
                    className="bg-[#0d1728] rounded-[1.75rem] border border-white/[0.07] p-7 shadow-xl hover:border-cyan-400/20 transition"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center text-3xl">
                      {icon}
                    </div>

                    <h4 className="text-xl font-black mt-6">
                      {title}
                    </h4>

                    <p className="text-slate-500 mt-2">
                      {text}
                    </p>

                    <div className="mt-6 text-cyan-400 font-bold text-sm">
                      Explore →
                    </div>

                  </motion.div>

                ))}

              </div>

            </section>

            {/* =================================================
                PACKING
            ================================================= */}

            <section
              id="section-packing"
              className="pt-24 scroll-mt-24"
            >

              <div className="rounded-[2rem] bg-[#0d1728] border border-white/[0.07] p-7 md:p-10">

                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-5">

                  <div>

                    <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em]">
                      Travel smart
                    </p>

                    <h3 className="text-4xl font-black mt-3">
                      Pack without forgetting.
                    </h3>

                  </div>

                  <div className="text-slate-500">
                    {packingList.length} essentials
                  </div>

                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-9">

                  {packingList.map((item) => (

                    <label
                      key={item}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.05] hover:bg-emerald-400/[0.06] cursor-pointer transition"
                    >

                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-emerald-500"
                      />

                      <span className="font-medium text-slate-300">
                        {item}
                      </span>

                    </label>

                  ))}

                </div>

              </div>

            </section>

            {/* =================================================
                SHOPPING
            ================================================= */}

            <section
              id="section-shopping"
              className="pt-24 scroll-mt-24"
            >

              <div className="mb-9">

                <p className="text-violet-400 text-xs font-black uppercase tracking-[0.3em]">
                  Essentials
                </p>

                <h3 className="text-4xl md:text-5xl font-black mt-3">
                  Smart shopping list.
                </h3>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {shoppingList.map((item, index) => (

                  <motion.div
                    key={item}
                    whileHover={{ y: -5 }}
                    className="bg-[#0d1728] border border-white/[0.07] rounded-[1.5rem] p-6 hover:border-violet-400/20 transition"
                  >

                    <div className="flex justify-between">

                      <span className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-2xl">
                        🛍️
                      </span>

                      <span className="text-xs text-slate-600">
                        0{index + 1}
                      </span>

                    </div>

                    <h4 className="font-black text-lg mt-6">
                      {item}
                    </h4>

                    <p className="text-sm text-slate-500 mt-2">
                      Recommended for your journey.
                    </p>

                  </motion.div>

                ))}

              </div>

            </section>

            {/* =================================================
                BUDGET
            ================================================= */}

            <section
              id="section-budget"
              className="pt-24 scroll-mt-24"
            >

              <div className="rounded-[2rem] bg-[#0d1728] border border-white/[0.07] text-white p-8 md:p-10 overflow-hidden relative">

                <div className="absolute right-[-100px] bottom-[-150px] w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full" />

                <div className="relative">

                  <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em]">
                    Money matters
                  </p>

                  <h3 className="text-4xl md:text-5xl font-black mt-3">
                    Keep your trip on budget.
                  </h3>

                  <div className="grid md:grid-cols-3 gap-5 mt-10">

                    <div>

                      <label className="text-slate-500 text-sm">
                        Travellers
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={people}
                        onChange={(e) =>
                          setPeople(
                            Math.max(
                              1,
                              Number(e.target.value)
                            )
                          )
                        }
                        className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
                      />

                    </div>

                    <div>

                      <label className="text-slate-500 text-sm">
                        Extra expenses
                      </label>

                      <input
                        value={extraExpenses}
                        onChange={(e) =>
                          setExtraExpenses(
                            e.target.value
                          )
                        }
                        placeholder="₹5,000"
                        className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 outline-none"
                      />

                    </div>

                    <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-5">

                      <p className="text-slate-500 text-sm">
                        Estimated per person
                      </p>

                      <p className="text-4xl font-black text-emerald-400 mt-2">
                        ₹
                        {calculatePerPerson().toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7">

                    {[
                      ["🏨", "Stay", "25%"],
                      ["🚆", "Transport", "20%"],
                      ["🍜", "Food", "20%"],
                      ["🎟️", "Activities", "35%"],
                    ].map(
                      ([icon, title, percentage]) => (

                        <div
                          key={title}
                          className="bg-white/[0.04] border border-white/10 rounded-2xl p-5"
                        >

                          <span className="text-2xl">
                            {icon}
                          </span>

                          <p className="font-bold mt-4">
                            {title}
                          </p>

                          <p className="text-emerald-400 text-xl font-black mt-1">
                            {percentage}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                AI ASSISTANT
            ================================================= */}

            <section
              id="section-assistant"
              className="pt-24 scroll-mt-24"
            >

              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white p-8 md:p-12">

                <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

                <div className="relative">

                  <div className="flex items-center gap-5">

                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl">
                      🤖
                    </div>

                    <div>

                      <p className="text-indigo-200 text-xs font-black uppercase tracking-[0.25em]">
                        Your travel copilot
                      </p>

                      <h3 className="text-3xl md:text-4xl font-black mt-1">
                        Ask Journey Jotter AI
                      </h3>

                    </div>

                  </div>

                  <p className="text-indigo-100 max-w-2xl mt-7">
                    Ask anything about {destination} —
                    food, hidden places, transport, timing,
                    safety or what to do next.
                  </p>

                  <textarea
                    value={assistantQuestion}
                    onChange={(e) =>
                      setAssistantQuestion(
                        e.target.value
                      )
                    }
                    placeholder="e.g. What should I do on the evening of Day 2?"
                    rows="4"
                    className="w-full mt-8 rounded-2xl bg-black/10 border border-white/10 p-5 text-white placeholder:text-indigo-200 outline-none focus:bg-black/20"
                  />

                  <button
                    onClick={askAssistant}
                    disabled={
                      assistantLoading ||
                      !assistantQuestion.trim()
                    }
                    className="mt-4 px-7 py-3 rounded-xl bg-white text-indigo-700 font-black disabled:opacity-50 hover:bg-indigo-50 transition"
                  >
                    {assistantLoading
                      ? "AI is thinking..."
                      : "Ask AI →"}
                  </button>

                  {assistantAnswer && (
                    <div className="mt-7 bg-white text-slate-900 rounded-2xl p-7">

                      <div className="prose prose-slate max-w-none">

                        <ReactMarkdown>
                          {assistantAnswer}
                        </ReactMarkdown>

                      </div>

                    </div>
                  )}

                </div>

              </div>

            </section>

          </div>

        </main>
      )}

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!trip && !loading && (

        <section className="bg-[#050816] max-w-7xl mx-auto px-6 py-24">

          <div className="text-center mb-12">

            <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
              Everything in one place
            </p>

            <h2 className="text-4xl md:text-5xl font-black mt-3">
              Your entire journey,
              <br />
              beautifully organized.
            </h2>

            <p className="text-slate-500 max-w-xl mx-auto mt-5">
              From the first idea to the final day of
              your adventure.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "🤖",
                "AI Itinerary",
                "A personalized day-by-day adventure.",
              ],
              [
                "☀️",
                "Live Weather",
                "Know what the skies have planned.",
              ],
              [
                "🗺️",
                "Interactive Map",
                "Explore your destination visually.",
              ],
              [
                "💰",
                "Smart Budget",
                "Plan spending before you travel.",
              ],
            ].map(([icon, title, text]) => (

              <motion.div
                key={title}
                whileHover={{ y: -7 }}
                className="bg-[#0d1728] border border-white/[0.07] rounded-[1.75rem] p-7 shadow-xl hover:border-cyan-400/20 transition"
              >

                <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center text-3xl">
                  {icon}
                </div>

                <h3 className="font-black text-xl mt-6">
                  {title}
                </h3>

                <p className="text-slate-500 mt-2 leading-relaxed">
                  {text}
                </p>

              </motion.div>

            ))}

          </div>

        </section>

      )}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#03050d] border-t border-white/[0.05] text-white py-14">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <div className="text-3xl">
            🌍
          </div>

          <h3 className="font-black text-xl mt-3">
            Journey Jotter
          </h3>

          <p className="text-slate-600 text-sm mt-2">
            Plan less. Explore more.
          </p>

          <p className="text-slate-700 text-xs mt-8">
            ✨ Have a safe and memorable journey!
          </p>

        </div>

      </footer>

    </div>
  );
}

export default TripPlanner;
