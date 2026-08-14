import { motion } from "framer-motion";
import {
  CloudSun,
  Wallet,
  CalendarDays,
  Languages,
  Coins,
  MapPin,
  Sparkles,
} from "lucide-react";

function TravelSnapshot({
  destination = "",
  weather = null,
}) {
  const place = destination || "Your Destination";

  const getBestTime = (name) => {
    const key = name.toLowerCase();

    if (key.includes("goa")) return "November – February";
    if (key.includes("manali")) return "March – June";
    if (key.includes("kashmir")) return "March – October";
    if (key.includes("jaipur")) return "October – March";
    if (key.includes("kerala")) return "October – March";
    if (key.includes("dubai")) return "November – March";
    if (key.includes("paris")) return "April – June";
    if (key.includes("london")) return "May – September";
    if (key.includes("bali")) return "April – October";
    if (key.includes("tokyo")) return "March – May";
    if (key.includes("singapore")) return "February – April";
    if (key.includes("switzerland")) return "June – September";
    if (key.includes("mumbai")) return "November – February";
    if (key.includes("delhi")) return "October – March";
    if (key.includes("rajasthan")) return "October – March";

    return "October – March";
  };

  const getCurrency = (name) => {
    const key = name.toLowerCase();

    if (
      key.includes("paris") ||
      key.includes("london") ||
      key.includes("bali") ||
      key.includes("dubai") ||
      key.includes("tokyo") ||
      key.includes("singapore") ||
      key.includes("switzerland")
    ) {
      if (key.includes("paris")) return "Euro (€)";
      if (key.includes("london")) return "British Pound (£)";
      if (key.includes("bali")) return "Indonesian Rupiah (Rp)";
      if (key.includes("dubai")) return "UAE Dirham (AED)";
      if (key.includes("tokyo")) return "Japanese Yen (¥)";
      if (key.includes("singapore")) return "Singapore Dollar (S$)";
      if (key.includes("switzerland")) return "Swiss Franc (CHF)";
    }

    return "Indian Rupee (₹)";
  };

  const getLanguage = (name) => {
    const key = name.toLowerCase();

    if (key.includes("paris")) return "French";
    if (key.includes("london")) return "English";
    if (key.includes("bali")) return "Indonesian";
    if (key.includes("dubai")) return "Arabic & English";
    if (key.includes("tokyo")) return "Japanese";
    if (key.includes("singapore")) return "English & Mandarin";
    if (key.includes("switzerland")) return "German, French & Italian";

    return "Hindi & English";
  };

  const getBudget = (name) => {
    const key = name.toLowerCase();

    if (
      key.includes("paris") ||
      key.includes("london") ||
      key.includes("switzerland")
    ) {
      return "₹8,000+ / day";
    }

    if (
      key.includes("dubai") ||
      key.includes("singapore") ||
      key.includes("tokyo")
    ) {
      return "₹6,000+ / day";
    }

    return "₹2,500 – ₹5,000 / day";
  };

  const getTemperature = () => {
    if (!weather) return "Weather preview";

    return (
      weather.temperature ??
      weather.temp ??
      weather.main?.temp ??
      weather.current?.temp ??
      "Available"
    );
  };

  const snapshotItems = [
    {
      icon: <CloudSun size={23} />,
      label: "Weather",
      value:
        typeof getTemperature() === "number"
          ? `${Math.round(getTemperature())}°C`
          : String(getTemperature()),
      description: weather?.description || "Live weather preview",
    },
    {
      icon: <Wallet size={23} />,
      label: "Daily Budget",
      value: getBudget(place),
      description: "Estimated travel spending",
    },
    {
      icon: <CalendarDays size={23} />,
      label: "Best Time",
      value: getBestTime(place),
      description: "Ideal time to visit",
    },
    {
      icon: <Languages size={23} />,
      label: "Language",
      value: getLanguage(place),
      description: "Commonly spoken",
    },
    {
      icon: <Coins size={23} />,
      label: "Currency",
      value: getCurrency(place),
      description: "Local currency",
    },
    {
      icon: <MapPin size={23} />,
      label: "Destination",
      value: place,
      description: "Your selected location",
    },
  ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="mt-10"
    >
      {/* HEADER */}

      <div className="mb-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
          <Sparkles size={15} />
          SMART TRAVEL SNAPSHOT
        </div>

        <h2 className="text-3xl font-black text-slate-900 md:text-4xl">
          Know Before You Go
        </h2>

        <p className="mt-2 text-slate-500">
          Quick travel information for{" "}
          <span className="font-bold text-slate-700">
            {place}
          </span>
        </p>
      </div>

      {/* SNAPSHOT GRID */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {snapshotItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.06,
            }}
            whileHover={{
              y: -5,
            }}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                {item.icon}
              </div>
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-wide text-slate-400">
              {item.label}
            </p>

            <h3 className="mt-2 text-xl font-black text-slate-900">
              {item.value}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default TravelSnapshot;