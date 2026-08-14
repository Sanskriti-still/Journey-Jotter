import { motion } from "framer-motion";

function SectionHeading({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-14"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;