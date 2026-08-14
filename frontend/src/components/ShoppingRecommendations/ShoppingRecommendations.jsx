import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Gift,
  Utensils,
  Gem,
  Shirt,
  Coffee,
  Sparkles,
} from "lucide-react";

function ShoppingRecommendations({
  destination = "",
}) {
  const recommendations = useMemo(() => {
    const name = destination.toLowerCase();

    if (name.includes("goa")) {
      return [
        {
          name: "Cashew Nuts",
          type: "Local Food",
          icon: Utensils,
          description: "A popular local snack and a nice gift to take home.",
        },
        {
          name: "Beachwear",
          type: "Fashion",
          icon: Shirt,
          description: "Lightweight beachwear and casual holiday clothes.",
        },
        {
          name: "Handmade Accessories",
          type: "Souvenir",
          icon: Gem,
          description: "Colourful handmade jewellery and accessories.",
        },
        {
          name: "Local Coffee",
          type: "Food & Drink",
          icon: Coffee,
          description: "Pick up locally available coffee and packaged treats.",
        },
      ];
    }

    if (name.includes("jaipur") || name.includes("rajasthan")) {
      return [
        {
          name: "Blue Pottery",
          type: "Handicraft",
          icon: Gem,
          description: "Beautiful traditional pottery and decorative pieces.",
        },
        {
          name: "Block Print Fabrics",
          type: "Textiles",
          icon: Shirt,
          description: "Traditional printed fabrics with colourful patterns.",
        },
        {
          name: "Handmade Jewellery",
          type: "Accessories",
          icon: Gem,
          description: "Traditional jewellery inspired by Rajasthani designs.",
        },
        {
          name: "Local Spices",
          type: "Food",
          icon: Utensils,
          description: "Aromatic spices and regional food products.",
        },
      ];
    }

    if (name.includes("paris")) {
      return [
        {
          name: "French Chocolates",
          type: "Food",
          icon: Gift,
          description: "A classic edible souvenir to take back home.",
        },
        {
          name: "French Perfume",
          type: "Beauty",
          icon: Sparkles,
          description: "Paris is famous for its perfumes and fragrances.",
        },
        {
          name: "Fashion Accessories",
          type: "Fashion",
          icon: Shirt,
          description: "Stylish scarves, bags and other fashion pieces.",
        },
        {
          name: "Paris Souvenirs",
          type: "Souvenir",
          icon: Gift,
          description: "Small Eiffel Tower and Paris-themed keepsakes.",
        },
      ];
    }

    if (name.includes("manali") || name.includes("kashmir")) {
      return [
        {
          name: "Woollen Clothes",
          type: "Fashion",
          icon: Shirt,
          description: "Warm sweaters, shawls and winter accessories.",
        },
        {
          name: "Handmade Crafts",
          type: "Handicraft",
          icon: Gem,
          description: "Traditional handmade products from the region.",
        },
        {
          name: "Local Tea",
          type: "Food & Drink",
          icon: Coffee,
          description: "Take home regional tea and other local products.",
        },
        {
          name: "Dry Fruits",
          type: "Food",
          icon: Utensils,
          description: "A practical and popular travel gift.",
        },
      ];
    }

    if (name.includes("dubai")) {
      return [
        {
          name: "Dates",
          type: "Local Food",
          icon: Utensils,
          description: "A popular traditional food item and gift.",
        },
        {
          name: "Perfumes",
          type: "Beauty",
          icon: Sparkles,
          description: "Explore traditional and modern fragrances.",
        },
        {
          name: "Arabic Souvenirs",
          type: "Souvenir",
          icon: Gift,
          description: "Small traditional keepsakes from your trip.",
        },
        {
          name: "Fashion Accessories",
          type: "Fashion",
          icon: Shirt,
          description: "Bags, scarves and other stylish accessories.",
        },
      ];
    }

    if (name.includes("bali")) {
      return [
        {
          name: "Handmade Crafts",
          type: "Handicraft",
          icon: Gem,
          description: "Beautiful locally made decorative crafts.",
        },
        {
          name: "Coffee",
          type: "Food & Drink",
          icon: Coffee,
          description: "Try locally produced Indonesian coffee.",
        },
        {
          name: "Beachwear",
          type: "Fashion",
          icon: Shirt,
          description: "Light clothes and beach accessories.",
        },
        {
          name: "Local Souvenirs",
          type: "Souvenir",
          icon: Gift,
          description: "Small Bali-themed keepsakes for friends and family.",
        },
      ];
    }

    return [
      {
        name: "Local Handicrafts",
        type: "Handicraft",
        icon: Gem,
        description: `Look for traditional handmade products from ${destination}.`,
      },
      {
        name: "Local Food Products",
        type: "Food",
        icon: Utensils,
        description: "Try packaged local specialities that are easy to carry.",
      },
      {
        name: "Souvenirs",
        type: "Keepsake",
        icon: Gift,
        description: `Pick up a small souvenir to remember ${destination}.`,
      },
      {
        name: "Local Fashion",
        type: "Fashion",
        icon: Shirt,
        description: "Explore clothing and accessories inspired by the destination.",
      },
    ];
  }, [destination]);

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
        <p className="text-sm font-bold uppercase tracking-wider text-cyan-600">
          Don't forget to explore
        </p>

        <h2 className="mt-1 flex items-center gap-3 text-3xl font-black text-slate-900">
          <ShoppingBag
            size={30}
            className="text-cyan-600"
          />
          What to Shop in {destination}
        </h2>

        <p className="mt-2 text-slate-500">
          A few things worth checking out during your trip.
        </p>
      </div>

      {/* SHOPPING CARDS */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={`${item.name}-${index}`}
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
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
              className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg transition hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100">
                  <Icon
                    size={22}
                    className="text-cyan-600"
                  />
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                  {item.type}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {item.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* SMALL FOOTER */}

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
        <Sparkles
          size={19}
          className="shrink-0 text-cyan-600"
        />

        <p className="text-sm font-medium text-cyan-800">
          Tip: Leave some space in your luggage for local finds and souvenirs.
        </p>
      </div>
    </motion.section>
  );
}

export default ShoppingRecommendations;