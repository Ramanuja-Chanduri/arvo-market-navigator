import { motion } from "framer-motion";
import TickerCard from "./TickerCard";
import CitationCard from "./CitationCard";

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  tickers?: { symbol: string; name: string; price: string; change: number }[];
  citations?: { source: string; headline: string }[];
}

interface ChatMessageProps {
  message: ChatMessageData;
  index: number;
  isStreaming?: boolean;
}

const BlinkingCursor = () => (
  <motion.span
    className="inline-block w-[2px] h-[1.1em] bg-primary ml-0.5 align-text-bottom"
    animate={{ opacity: [1, 0] }}
    transition={{ duration: 0.6, repeat: Infinity, ease: "steps(2)" }}
  />
);

const ChatMessage = ({ message, index, isStreaming }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}
    >
      <div
        className={`max-w-2xl ${
          isUser
            ? "bg-secondary rounded-2xl rounded-br-md px-4 py-3"
            : "border-l-2 border-[hsl(25,95%,53%)] pl-4"
        }`}
      >
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {message.content}
          {isStreaming && <BlinkingCursor />}
        </p>

        {message.tickers && message.tickers.length > 0 && (
          <div className="flex flex-wrap mt-3">
            {message.tickers.map((t) => (
              <TickerCard key={t.symbol} {...t} />
            ))}
          </div>
        )}

        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap mt-3">
            {message.citations.map((c, i) => (
              <CitationCard key={i} {...c} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
