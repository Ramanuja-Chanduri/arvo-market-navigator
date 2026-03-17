interface TickerCardProps {
  symbol: string;
  name: string;
  price: string;
  change: number;
}

const TickerCard = ({ symbol, name, price, change }: TickerCardProps) => {
  const isPositive = change > 0;
  const pathPositive = "M0 20 L8 16 L16 18 L24 10 L32 14 L40 6 L48 2";
  const pathNegative = "M0 4 L8 8 L16 6 L24 14 L32 10 L40 18 L48 20";

  return (
    <div className="inline-flex items-center gap-3 p-2 px-3 my-1 mr-2 rounded-lg border border-luminous bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 cursor-pointer">
      <div className="flex flex-col">
        <span className="text-xs font-bold tracking-wider text-foreground">{symbol}</span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-tight">{name}</span>
      </div>
      <div className="h-8 w-px bg-[rgba(255,255,255,0.08)]" />
      <div className="flex flex-col items-end">
        <span className="text-sm font-mono font-medium text-foreground">${price}</span>
        <span className={`text-[10px] font-mono ${isPositive ? "text-positive" : "text-negative"}`}>
          {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
        </span>
      </div>
      <svg className={`w-12 h-6 ml-1 fill-none stroke-[1.5] ${isPositive ? "stroke-positive/60" : "stroke-negative/60"}`} viewBox="0 0 48 24">
        <path d={isPositive ? pathPositive : pathNegative} />
      </svg>
    </div>
  );
};

export default TickerCard;
