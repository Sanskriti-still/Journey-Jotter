import { motion } from "framer-motion";

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        rounded-3xl
        border
        border-white/30
        bg-white/70
        backdrop-blur-xl
        shadow-xl
        p-6
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;