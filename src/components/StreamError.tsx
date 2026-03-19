import { motion } from "framer-motion";
import { AlertCircle, RotateCcw } from "lucide-react";

interface StreamErrorProps {
  error: string;
  onRetry: () => void;
}

const StreamError = ({ error, onRetry }: StreamErrorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start mb-6"
    >
      <div className="border-l-2 border-destructive pl-4 max-w-2xl">
        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5">
          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-destructive/90">{error}</p>
            <button
              onClick={onRetry}
              className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Retry
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StreamError;
