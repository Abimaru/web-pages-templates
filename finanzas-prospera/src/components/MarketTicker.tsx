import { TrendingUp, TrendingDown, Radio } from "lucide-react";
import { markets } from "../data/market";

export default function MarketTicker() {
  const items = [...markets, ...markets];
  return (
    <div className="flex items-stretch overflow-hidden border-y border-white/10 bg-navy text-white">
      <div className="z-10 flex shrink-0 items-center gap-2 bg-forest px-4 text-xs font-bold uppercase tracking-wider">
        <Radio size={14} className="animate-pulse" /> Mercado hoy
      </div>
      <div className="relative flex-1 overflow-hidden py-2.5">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap px-6">
          {items.map((m, i) => {
            const up = m.change >= 0;
            return (
              <span key={i} className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-white/90">{m.name}</span>
                <span className="text-white/70">{m.value}</span>
                <span className={`flex items-center gap-0.5 font-semibold ${up ? "text-green-bright" : "text-rose-400"}`}>
                  {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {up ? "+" : ""}{m.change.toFixed(2)}%
                </span>
                <span className="text-white/20">•</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
