import { motion } from "framer-motion";

function DestinationCard({
  image,
  title,
  country,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-xl"
    >
      <img
        src={image}
        alt={title}
        className="h-64 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-2xl font-bold">
          {title}
        </h3>

        <p className="text-gray-500 mt-1">
          {country}
        </p>
      </div>
    </motion.div>
  );
}

export default DestinationCard;