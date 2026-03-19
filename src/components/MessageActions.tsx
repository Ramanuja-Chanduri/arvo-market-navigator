import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, RefreshCw, Copy, Check } from "lucide-react";

interface MessageActionsProps {
  content: string;
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

const MessageActions = ({ content, onRegenerate, isRegenerating }: MessageActionsProps) => {
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const toggleReaction = (type: "like" | "dislike") => {
    setReaction((prev) => (prev === type ? null : type));
  };

  const btnClass =
    "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex items-center gap-0.5 mt-2 -ml-1"
    >
      <button
        onClick={() => toggleReaction("like")}
        className={`${btnClass} ${reaction === "like" ? "!text-positive" : ""}`}
        title="Like"
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => toggleReaction("dislike")}
        className={`${btnClass} ${reaction === "dislike" ? "!text-destructive" : ""}`}
        title="Dislike"
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={onRegenerate}
        disabled={isRegenerating}
        className={`${btnClass} disabled:opacity-40`}
        title="Regenerate"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin" : ""}`} />
      </button>
      <button onClick={handleCopy} className={btnClass} title="Copy">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-positive" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </motion.div>
  );
};

export default MessageActions;
