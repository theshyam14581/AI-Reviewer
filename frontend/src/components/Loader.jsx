import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="flex justify-center items-center py-10">

      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear"
        }}
        className="
        w-20
        h-20
        rounded-full
        border-4
        border-red-500
        border-t-cyan-400
        "
      />

    </div>
  );
}

export default Loader;