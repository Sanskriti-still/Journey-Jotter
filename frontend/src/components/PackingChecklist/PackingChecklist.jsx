import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Backpack,
  Check,
  CloudSun,
  Shirt,
  Footprints,
  Droplets,
  Camera,
  Pill,
  ShieldCheck,
} from "lucide-react";

function PackingChecklist({
  destination = "",
  days = 3,
  weather = null,
}) {
  const [checkedItems, setCheckedItems] = useState({});

  const items = useMemo(() => {
    const baseItems = [
      {
        id: "clothes",
        name: "Comfortable clothes",
        description: "Pack outfits according to the trip duration.",
        icon: Shirt,
      },
      {
        id: "shoes",
        name: "Comfortable shoes",
        description: "Useful for walking and sightseeing.",
        icon: Footprints,
      },
      {
        id: "toiletries",
        name: "Toiletries",
        description: "Carry your basic personal-care items.",
        icon: Droplets,
      },
      {
        id: "charger",
        name: "Phone charger",
        description: "Keep your charger and necessary cables.",
        icon: Camera,
      },
      {
        id: "medicines",
        name: "Basic medicines",
        description: "Carry medicines you may normally need.",
        icon: Pill,
      },
      {
        id: "documents",
        name: "ID & travel documents",
        description: "Keep your ID, tickets and bookings safe.",
        icon: ShieldCheck,
      },
    ];

    const destinationName = destination.toLowerCase();

    if (
      destinationName.includes("goa") ||
      destinationName.includes("bali") ||
      destinationName.includes("kerala")
    ) {
      baseItems.push({
        id: "swimwear",
        name: "Swimwear",
        description: "Useful for beaches, pools and water activities.",
        icon: Droplets,
      });
    }

    if (
      destinationName.includes("manali") ||
      destinationName.includes("kashmir") ||
      destinationName.includes("switzerland")
    ) {
      baseItems.push({
        id: "warm-clothes",
        name: "Warm layers",
        description: "Carry jackets or warm clothes for colder weather.",
        icon: Shirt,
      });
    }

    if (
      destinationName.includes("paris") ||
      destinationName.includes("london") ||
      destinationName.includes("dubai")
    ) {
      baseItems.push({
        id: "power-adapter",
        name: "Travel adapter",
        description: "Useful when travelling internationally.",
        icon: ShieldCheck,
      });
    }

    return baseItems;
  }, [destination]);

  const toggleItem = (id) => {
    setCheckedItems((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const completedCount = items.filter(
    (item) => checkedItems[item.id]
  ).length;

  const progress =
    items.length > 0
      ? Math.round((completedCount / items.length) * 100)
      : 0;

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

      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Be travel ready
          </p>

          <h2 className="mt-1 flex items-center gap-3 text-3xl font-black text-slate-900">
            <Backpack className="text-blue-600" size={30} />
            Packing Checklist
          </h2>

          <p className="mt-2 text-slate-500">
            Essentials to pack for your{" "}
            <span className="font-bold text-slate-700">
              {destination}
            </span>{" "}
            trip.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            {completedCount} / {items.length} packed
          </p>

          <div className="mt-2 h-2 w-36 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.4,
              }}
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* WEATHER TIP */}

      {weather && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <CloudSun
            size={23}
            className="shrink-0 text-blue-600"
          />

          <p className="text-sm font-medium text-blue-800">
            Pack according to the weather conditions during your trip.
          </p>
        </div>
      )}

      {/* CHECKLIST */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          const checked = Boolean(checkedItems[item.id]);

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => toggleItem(item.id)}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
              }}
              whileHover={{
                y: -4,
              }}
              className={`flex items-start gap-4 rounded-3xl border p-5 text-left shadow-sm transition ${
                checked
                  ? "border-green-200 bg-green-50"
                  : "border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg"
              }`}
            >
              {/* CHECK */}

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition ${
                  checked
                    ? "bg-green-500 text-white"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {checked ? (
                  <Check size={21} strokeWidth={3} />
                ) : (
                  <Icon size={21} />
                )}
              </div>

              {/* TEXT */}

              <div className="min-w-0">
                <h3
                  className={`font-bold ${
                    checked
                      ? "text-green-800 line-through"
                      : "text-slate-900"
                  }`}
                >
                  {item.name}
                </h3>

                <p
                  className={`mt-1 text-sm leading-6 ${
                    checked
                      ? "text-green-700"
                      : "text-slate-500"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* FOOTER */}

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100">
          <Backpack
            size={18}
            className="text-cyan-600"
          />
        </div>

        <p className="text-sm text-slate-600">
          Trip duration:{" "}
          <span className="font-bold text-slate-900">
            {days} {Number(days) === 1 ? "day" : "days"}
          </span>
        </p>
      </div>
    </motion.section>
  );
}

export default PackingChecklist;