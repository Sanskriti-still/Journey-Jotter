import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Sparkles } from "lucide-react";

function RegenerateDay({
  dayNumber,
  destination,
  onRegenerate,
}) {
  const [loading, setLoading] = useState(false);

  const handleRegenerate = async () => {
    if (!onRegenerate || loading) return;

    try {
      setLoading(true);

      await onRegenerate(dayNumber);
    } catch (error) {
      console.error(
        "Day regeneration failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      type="button"
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.97,
      }}
      onClick={handleRegenerate}
      disabled={loading}
      className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <RefreshCw
            size={17}
            className="animate-spin"
          />

          Regenerating Day {dayNumber}...
        </>
      ) : (
        <>
          <Sparkles size={17} />

          Regenerate Day {dayNumber}
        </>
      )}
    </motion.button>
  );
}

export default RegenerateDay;