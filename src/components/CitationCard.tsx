import { ExternalLink } from "lucide-react";

interface CitationCardProps {
  source: string;
  headline: string;
}

const CitationCard = ({ source, headline }: CitationCardProps) => (
  <div className="inline-flex items-center gap-2.5 px-3 py-2 my-1 mr-2 rounded-lg border border-luminous bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300 cursor-pointer group max-w-sm">
    <div className="w-5 h-5 rounded bg-secondary flex items-center justify-center shrink-0">
      <span className="text-[9px] font-bold text-muted-foreground">{source[0]}</span>
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{source}</span>
      <span className="text-xs text-foreground/80 truncate">{headline}</span>
    </div>
    <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary shrink-0 transition-colors duration-300" />
  </div>
);

export default CitationCard;
