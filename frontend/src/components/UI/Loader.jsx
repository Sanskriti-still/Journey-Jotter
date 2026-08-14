import { motion } from "framer-motion";

function Loader() {
  const steps = [
    "✈ Finding hidden gems...",
    "🏨 Searching best hotels...",
    "🍜 Discovering local food...",
    "🌤 Checking weather...",
    "🗺 Building your itinerary..."
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="text-6xl"
      >
        🌍
      </motion.div>

      <h2 className="mt-8 text-3xl font-bold">
        Planning Your Dream Journey
      </h2>

      <div className="mt-8 space-y-3">
        {steps.map((step, index) => (
          <motion.p
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              delay: index * 0.4,
              duration: 1.5,
              repeat: Infinity,
            }}
            className="text-gray-600 text-lg"
          >
            {step}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

export default Loader;