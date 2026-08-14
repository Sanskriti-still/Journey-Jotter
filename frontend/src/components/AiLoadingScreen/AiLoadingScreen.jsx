import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Plane,
  Compass,
  Stars,
} from "lucide-react";

function AiLoadingScreen({
  destination = "",
  loadingMessage = "Preparing your journey...",
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative my-8 overflow-hidden rounded-[32px] border border-white/10 bg-slate-950 px-6 py-12 text-white shadow-2xl md:px-12 md:py-16"
    >
      {/* Background glow */}

      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl" />

      {/* Floating stars */}

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[12%] top-[18%] text-blue-300/50"
      >
        <Stars size={20} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 14, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[15%] top-[25%] text-cyan-300/50"
      >
        <Stars size={16} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] left-[20%] text-violet-300/40"
      >
        <Sparkles size={18} />
      </motion.div>

      {/* Main content */}

      <div className="relative z-10 mx-auto max-w-3xl text-center">

        {/* Animated icon */}

        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center">

          <div className="relative flex h-24 w-24 items-center justify-center">

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.25, 0.1, 0.25],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full bg-blue-500"
            />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-2 rounded-full border border-dashed border-cyan-400/60"
            />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">

              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <Plane size={30} />
              </motion.div>

            </div>

          </div>

        </div>

        {/* Badge */}

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300 backdrop-blur-md">

          <Sparkles size={15} />

          JOURNEY JOTTER AI

        </div>

        {/* Heading */}

        <h2 className="text-3xl font-black tracking-tight md:text-4xl">

          Creating your perfect journey

        </h2>

        {/* Destination */}

        {destination && (
          <div className="mt-4 flex items-center justify-center gap-2 text-lg font-semibold text-cyan-300">

            <MapPin size={19} />

            {destination}

          </div>
        )}

        {/* Loading message */}

        <motion.p
          key={loadingMessage}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="mt-6 text-base text-slate-400 md:text-lg"
        >
          {loadingMessage}
        </motion.p>

        {/* Progress dots */}

        <div className="mt-9 flex items-center justify-center gap-2">

          {[0, 1, 2].map((item) => (

            <motion.span
              key={item}
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.35, 1, 0.35],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: item * 0.2,
              }}
              className="h-2.5 w-2.5 rounded-full bg-cyan-400"
            />

          ))}

        </div>

        {/* Bottom information */}

        <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">

            <Compass
              size={20}
              className="mx-auto text-blue-400"
            />

            <p className="mt-2 text-xs font-semibold text-slate-400">
              Discover
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">

            <MapPin
              size={20}
              className="mx-auto text-cyan-400"
            />

            <p className="mt-2 text-xs font-semibold text-slate-400">
              Explore
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">

            <Sparkles
              size={20}
              className="mx-auto text-violet-400"
            />

            <p className="mt-2 text-xs font-semibold text-slate-400">
              Personalize
            </p>

          </div>

        </div>

        {/* Bottom text */}

        <p className="mt-8 text-xs text-slate-600">
          AI is crafting your itinerary based on your
          destination, budget and travel style.
        </p>

      </div>

    </motion.section>
  );
}

export default AiLoadingScreen;