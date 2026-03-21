import { ExternalLink } from "lucide-react";

interface CitationCardProps {
  source: string;
  headline: string;
}

const CitationCard = ({ source, headline }: CitationCardProps) => (
  <div className="inline-flex items-center gap-2.5 px-3 py-2 my-1 mr-2 rounded-lg glass-surface hover:border-[rgba(123,47,190,0.5)] transition-all duration-300 cursor-pointer group max-w-sm">
    <div className="w-5 h-5 rounded bg-[rgba(123,47,190,0.2)] flex items-center justify-center shrink-0">
      <span className="text-[9px] font-bold text-foreground/70">{source[0]}</span>
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[10px] text-muted-foreground font-medium px-1.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.06)] w-fit">{source}</span>
      <span className="text-xs text-foreground/80 truncate mt-0.5">{headline}</span>
    </div>
    <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-[hsl(270,60%,65%)] shrink-0 transition-colors duration-300" />
  </div>
);

export default CitationCard;
