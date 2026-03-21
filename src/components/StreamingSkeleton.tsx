import { motion } from "framer-motion";

const StreamingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-start mb-6"
    >
      <div className="glass-surface rounded-2xl px-4 py-4 border-l-2 !border-l-[rgba(123,47,190,0.7)] max-w-md w-full">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-[hsl(270,60%,65%)] animate-glow-pulse"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-[hsl(221,83%,53%)] animate-glow-pulse"
            style={{ animationDelay: "0.3s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-[hsl(300,60%,70%)] animate-glow-pulse"
            style={{ animationDelay: "0.6s" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StreamingSkeleton;
