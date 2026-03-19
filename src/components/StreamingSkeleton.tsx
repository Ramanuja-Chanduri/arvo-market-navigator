import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

const StreamingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-start mb-6"
    >
      <div className="border-l-2 border-[hsl(25,95%,53%)] pl-4 w-full max-w-md">
        <div className="space-y-2.5 py-1">
          <Skeleton className="h-3 w-[85%] bg-muted" />
          <Skeleton className="h-3 w-[70%] bg-muted" />
          <Skeleton className="h-3 w-[55%] bg-muted" />
        </div>
      </div>
    </motion.div>
  );
};

export default StreamingSkeleton;
