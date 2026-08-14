import { motion } from "framer-motion";
import {
  CloudRain,
  CloudSun,
  Sun,
  Snowflake,
  Umbrella,
  Shirt,
  Camera,
  Map,
  Coffee,
} from "lucide-react";

function WeatherAdvice({ weather, destination }) {
  if (!weather || !destination) {
    return null;
  }

  const temperature = Number(
    weather.temperature ??
      weather.temp ??
      weather.main?.temp ??
      0
  );

  const description = String(
    weather.description ??
      weather.condition ??
      weather.weather?.[0]?.description ??
      ""
  ).toLowerCase();

  const isRainy =
    description.includes("rain") ||
    description.includes("drizzle") ||
    description.includes("storm") ||
    description.includes("thunder");

  const isSnowy =
    description.includes("snow") ||
    description.includes("blizzard") ||
    description.includes("ice");

  const isCloudy =
    description.includes("cloud") ||
    description.includes("overcast");

  let Icon = Sun;
  let title = "Great weather for exploring!";
  let message =
    "The conditions look comfortable for outdoor sightseeing and exploring the destination.";
  let tips = [
    {
      icon: Camera,
      text: "Great time for sightseeing and photography.",
    },
    {
      icon: Map,
      text: "Plan outdoor attractions during daylight hours.",
    },
    {
      icon: Shirt,
      text: "Wear comfortable clothes and walking shoes.",
    },
  ];

  if (isRainy) {
    Icon = CloudRain;
    title = "Rainy weather detected";
    message =
      "Keep your outdoor plans flexible and consider indoor experiences when rain gets heavier.";

    tips = [
      {
        icon: Umbrella,
        text: "Carry an umbrella or lightweight rain jacket.",
      },
      {
        icon: Coffee,
        text: "Keep cafés, museums and indoor attractions as backup options.",
      },
      {
        icon: Map,
        text: "Plan outdoor sightseeing around periods of lighter rain.",
      },
    ];
  } else if (isSnowy) {
    Icon = Snowflake;
    title = "Cold & snowy conditions";
    message =
      "Dress warmly and allow extra travel time because roads and walking routes may be slower.";

    tips = [
      {
        icon: Snowflake,
        text: "Carry warm layers, gloves and suitable footwear.",
      },
      {
        icon: Map,
        text: "Check road conditions before travelling to distant attractions.",
      },
      {
        icon: Camera,
        text: "Snowy landscapes can be perfect for photography.",
      },
    ];
  } else if (isCloudy) {
    Icon = CloudSun;
    title = "Partly cloudy conditions";
    message =
      "This is generally comfortable weather for exploring, especially if you prefer less intense sunlight.";

    tips = [
      {
        icon: Camera,
        text: "Good conditions for walking tours and photography.",
      },
      {
        icon: Map,
        text: "You can comfortably combine outdoor and indoor attractions.",
      },
      {
        icon: Shirt,
        text: "Keep a light layer handy in case temperatures drop.",
      },
    ];
  } else if (temperature >= 32) {
    Icon = Sun;
    title = "Hot weather ahead";
    message =
      "Plan outdoor activities during cooler hours and keep yourself hydrated.";

    tips = [
      {
        icon: Sun,
        text: "Prefer early morning or evening sightseeing.",
      },
      {
        icon: Shirt,
        text: "Wear breathable clothes, sunglasses and sunscreen.",
      },
      {
        icon: Coffee,
        text: "Take regular breaks and stay hydrated.",
      },
    ];
  } else if (temperature <= 10) {
    Icon = Snowflake;
    title = "Cold weather ahead";
    message =
      "Outdoor exploration is possible, but make sure you dress appropriately for the temperature.";

    tips = [
      {
        icon: Shirt,
        text: "Wear warm layers and comfortable closed shoes.",
      },
      {
        icon: Coffee,
        text: "Take warm-up breaks during longer outdoor activities.",
      },
      {
        icon: Camera,
        text: "Clear cold days can be excellent for sightseeing.",
      },
    ];
  }

  return (
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
      className="mt-10"
    >
      {/* HEADER */}

      <div className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">
          <CloudSun size={16} />
          WEATHER SMART
        </span>

        <h2 className="mt-4 text-3xl font-black text-slate-900">
          Weather-aware travel tips
        </h2>

        <p className="mt-2 text-slate-500">
          Smart suggestions for exploring {destination}.
        </p>
      </div>

      {/* MAIN WEATHER CARD */}

      <div className="overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-xl">

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">

                <Icon size={34} />

              </div>

              <div>

                <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
                  {destination}
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  {title}
                </h3>

              </div>

            </div>

            {temperature !== 0 && (
              <div className="text-left md:text-right">

                <p className="text-4xl font-black">
                  {Math.round(temperature)}°
                </p>

                <p className="text-sm text-white/70">
                  Current temperature
                </p>

              </div>
            )}

          </div>

          <p className="mt-6 max-w-3xl leading-7 text-white/85">
            {message}
          </p>

        </div>

        {/* TIPS */}

        <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">

          {tips.map((tip, index) => {

            const TipIcon = tip.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="rounded-3xl bg-slate-50 p-5"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">

                  <TipIcon
                    size={21}
                    className="text-blue-600"
                  />

                </div>

                <p className="mt-4 text-sm font-semibold leading-6 text-slate-700">
                  {tip.text}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </motion.section>
  );
}

export default WeatherAdvice;