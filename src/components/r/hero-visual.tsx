import { Bot, Clapperboard, Compass, MessagesSquare, Workflow } from "lucide-react";
import { LogoMark } from "./logo";

const tiles = [
  { key: "ai-agents", Icon: Bot, x: 22, y: 15 },
  { key: "conversational-ai", Icon: MessagesSquare, x: 79, y: 17 },
  { key: "ai-video-content", Icon: Clapperboard, x: 85, y: 60 },
  { key: "ai-systems-automation", Icon: Workflow, x: 15, y: 62 },
  { key: "ai-strategy-consulting", Icon: Compass, x: 52, y: 90 },
] as const;

const CX = 50;
const CY = 50;

export function HeroVisual({ labels, caption }: { labels: Record<string, string>; caption: string }) {
  return (
    <div className="r-hv" role="img" aria-label={caption} dir="ltr">
      <div className="r-hv-orb r-hv-orb-a" aria-hidden />
      <div className="r-hv-orb r-hv-orb-b" aria-hidden />
      <svg className="r-hv-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="hv-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--r-blue-3)" />
            <stop offset="1" stopColor="var(--r-blue)" />
          </linearGradient>
        </defs>
        {tiles.map((t, i) => {
          const mx = (CX + t.x) / 2 + (i % 2 ? 4 : -4);
          const my = (CY + t.y) / 2 + (i % 2 ? -4 : 4);
          const d = `M${CX} ${CY} Q${mx} ${my} ${t.x} ${t.y}`;
          return (
            <g key={t.key}>
              <path d={d} className="r-hv-line-glow" vectorEffect="non-scaling-stroke" />
              <path d={d} className="r-hv-line" vectorEffect="non-scaling-stroke" style={{ animationDelay: `${i * 0.5}s` }} />
              <circle cx={t.x} cy={t.y} r="0.9" className="r-hv-dot" />
            </g>
          );
        })}
      </svg>

      <div className="r-hv-center" style={{ left: `${CX}%`, top: `${CY}%` }}>
        <span className="r-hv-center-ring" aria-hidden />
        <LogoMark id="hv" className="r-hv-center-mark" />
      </div>

      {tiles.map((t, i) => (
        <div key={t.key} className="r-hv-tile" style={{ left: `${t.x}%`, top: `${t.y}%`, ["--fd" as string]: `${i * -1.3}s` }} dir="ltr">
          <span className="r-hv-icon">
            <t.Icon size={20} strokeWidth={1.8} aria-hidden />
          </span>
          <span className="r-hv-label">{labels[t.key]}</span>
        </div>
      ))}
    </div>
  );
}
