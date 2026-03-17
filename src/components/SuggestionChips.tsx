import { motion } from "framer-motion";

const suggestions = [
  { emoji: "📈", text: "Analyze NVIDIA's latest earnings" },
  { emoji: "📰", text: "Top market-moving news today" },
  { emoji: "🔍", text: "Compare AAPL vs MSFT performance" },
  { emoji: "📊", text: "What's driving the S&P 500 today?" },
];

interface SuggestionChipsProps {
  onSelect: (text: string) => void;
}

const SuggestionChips = ({ onSelect }: SuggestionChipsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
    {suggestions.map((s, i) => (
      <motion.button
        key={i}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.08 }}
        onClick={() => onSelect(`${s.emoji} ${s.text}`)}
        className="glass-surface rounded-xl px-4 py-3.5 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300 group"
      >
        <span className="mr-2">{s.emoji}</span>
        {s.text}
      </motion.button>
    ))}
  </div>
);

export default SuggestionChips;
