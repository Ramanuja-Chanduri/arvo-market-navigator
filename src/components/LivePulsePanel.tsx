import { useState } from "react";
import { ChevronLeft, ChevronRight, Newspaper, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsTile {
  ticker: string;
  sentiment: "bullish" | "bearish";
  summary: string;
  source: string;
  time: string;
}

const mockNews: NewsTile[] = [
  {
    ticker: "NVDA",
    sentiment: "bullish",
    summary:
      "Jensen Huang hints at next-gen Blackwell ramp ahead of schedule, supply constraints easing faster than expected.",
    source: "Reuters",
    time: "2m ago",
  },
  {
    ticker: "TSLA",
    sentiment: "bearish",
    summary:
      "Tesla Q2 delivery numbers miss analyst estimates by 8%, citing weak European demand and pricing pressure.",
    source: "Bloomberg",
    time: "5m ago",
  },
  {
    ticker: "AAPL",
    sentiment: "bullish",
    summary:
      "Apple Intelligence features driving record upgrade cycle among enterprise users, per Morgan Stanley note.",
    source: "CNBC",
    time: "8m ago",
  },
  {
    ticker: "MSFT",
    sentiment: "bullish",
    summary:
      "Azure AI revenue surges 47% YoY as enterprise cloud migration accelerates, beating consensus by $1.2B.",
    source: "The Verge",
    time: "11m ago",
  },
  {
    ticker: "AMZN",
    sentiment: "bearish",
    summary:
      "Amazon faces new EU antitrust probe over marketplace practices; shares dip 2.3% in pre-market trading.",
    source: "Financial Times",
    time: "14m ago",
  },
  {
    ticker: "META",
    sentiment: "bullish",
    summary:
      "Meta's Threads hits 250M daily active users milestone, ad monetization rollout begins in Q3.",
    source: "TechCrunch",
    time: "18m ago",
  },
  {
    ticker: "NVDA",
    sentiment: "bullish",
    summary:
      "Goldman Sachs raises NVDA price target to $1,200, cites AI infrastructure spending cycle extending to 2027.",
    source: "MarketWatch",
    time: "22m ago",
  },
  {
    ticker: "TSLA",
    sentiment: "bearish",
    summary:
      "Cybertruck recall expands to 125K units over drive inverter issue; production paused at Austin facility.",
    source: "Reuters",
    time: "27m ago",
  },
];

interface LivePulsePanelProps {
  className?: string;
}

const LivePulsePanel = ({ className }: LivePulsePanelProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`relative shrink-0 h-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        expanded ? "w-[300px]" : "w-[40px]"
      } ${className ?? ""}`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-12 rounded-l-lg glass-surface flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        {expanded ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      <div className="h-full glass-surface border-l border-luminous flex flex-col overflow-hidden">
        {expanded ? (
          <>
            {/* Header */}
            <div className="px-4 py-3 border-b border-luminous flex items-center gap-2 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-positive" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Live Pulse
              </span>
            </div>

            {/* Tiles */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {mockNews.map((item, i) => (
                <motion.div
                  key={`${item.ticker}-${i}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.06,
                  }}
                  className={`rounded-xl p-3 transition-all duration-300 cursor-default ${
                    item.sentiment === "bullish"
                      ? "bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.25)] hover:shadow-[0_4px_20px_-4px_rgba(34,197,94,0.3)]"
                      : "bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.25)] hover:shadow-[0_4px_20px_-4px_rgba(239,68,68,0.3)]"
                  } hover:-translate-y-0.5`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                        item.sentiment === "bullish"
                          ? "text-positive bg-[rgba(34,197,94,0.15)]"
                          : "text-negative bg-[rgba(239,68,68,0.15)]"
                      }`}
                    >
                      {item.ticker}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-foreground/80 mb-1.5">
                    {item.summary}
                  </p>
                  <span className="text-[10px] text-muted-foreground">
                    {item.source}
                  </span>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center pt-4 gap-3">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest [writing-mode:vertical-rl]">
              Pulse
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePulsePanel;
