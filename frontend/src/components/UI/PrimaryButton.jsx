import { motion } from "framer-motion";

function PrimaryButton({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        y: -2,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        duration: 0.2,
      }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-7 py-3
        rounded-2xl
        font-semibold
        text-white
        bg-gradient-to-r
        from-blue-600
        via-sky-500
        to-cyan-500
        shadow-lg
        shadow-blue-500/30
        hover:shadow-blue-500/50
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

export default PrimaryButton;