import { motion } from "framer-motion";


function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[180px] flex-col
        items-center justify-center gap-5
        rounded-2xl border border-white/10
        bg-[#101116] px-6 py-10 text-white"
    >
      {/* Static loader ring */}
      <div
        className="flex h-16 w-16 items-center
          justify-center rounded-full border-4
          border-red-500/30 border-t-cyan-400"
      >
        <span className="text-xl font-black text-red-400">
          AI
        </span>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <h2 className="text-lg font-bold">
          Generating Review
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          AI Reviewer is analyzing your website...
        </p>
      </div>
    </div>
  );
}

export default Loader;
