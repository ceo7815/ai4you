import type { ServiceSlug } from "@/lib/services";
import { LogoMark } from "./logo";

const tiles: { slug: ServiceSlug; x: number; y: number; icon: "bot" | "chat" | "play" | "layers" | "knight" }[] = [
  { slug: "ai-agents", x: 28, y: 10, icon: "bot" },
  { slug: "conversational-ai", x: 76, y: 16, icon: "chat" },
  { slug: "ai-video-content", x: 18, y: 48, icon: "play" },
  { slug: "ai-systems-automation", x: 86, y: 48, icon: "layers" },
  { slug: "ai-strategy-consulting", x: 52, y: 78, icon: "knight" },
];

const center = { x: 54, y: 46 };

function Icon({ name }: { name: (typeof tiles)[number]["icon"] }) {
  const props = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, "aria-hidden": true as const };
  if (name === "bot") {
    return (
      <svg {...props}>
        <rect x="5" y="8" width="14" height="11" rx="3" />
        <circle cx="9.5" cy="13" r="1" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="13" r="1" fill="currentColor" stroke="none" />
        <path d="M12 8V5M9 5h6" />
      </svg>
    );
  }
  if (name === "chat") {
    return (
      <svg {...props}>
        <path d="M5 16.5V8.5A2.5 2.5 0 0 1 7.5 6h7A2.5 2.5 0 0 1 17 8.5v4A2.5 2.5 0 0 1 14.5 15H9l-4 3.2Z" />
        <path d="M17 10h1.5A2.5 2.5 0 0 1 21 12.5v4L19 18" />
      </svg>
    );
  }
  if (name === "play") {
    return (
      <svg {...props} fill="currentColor" stroke="none">
        <path d="M8 5.5v13l11-6.5L8 5.5Z" />
      </svg>
    );
  }
  if (name === "layers") {
    return (
      <svg {...props}>
        <path d="M12 4 4 8l8 4 8-4-8-4Z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 16l8 4 8-4" />
      </svg>
    );
  }
  return (
    <svg {...props} fill="currentColor" stroke="none">
      <path d="M7.2 20h10.2v1.8H7.2zM8 17.8c.2-2.4 1.4-3.6 2.8-4.6 1.3-1 1.6-2.2 1.1-3.4-.3-.7-1-1.1-1.8-1.2C8.6 8.4 7.3 9.6 6.6 11.2c-.4 1-1.2 1.6-2.3 1.7l.4 1.4c1.4-.1 2.4-.8 3-1.9.3 1.3 0 2.5-1.2 3.5C5.3 16.8 4.7 18.4 4.6 20H7c.1-.7.3-1.2 1-2.2Zm6.2-12.6c1.7.2 2.8 1.5 3 3.2.2 2-1.1 3.3-2.6 4.2-1 .6-1.4 1.6-1.2 2.6 1.2.8 2.4 2.2 2.7 4.8h-2.2c-.3-2.1-1.2-3.2-2.4-4 .2-1.4-.2-2.7-1.3-3.4 1.4-.8 2.4-2 2.2-3.8-.1-1.2-.8-2-1.9-2.3 1.1-.7 2.3-.9 3.7-.3Z" />
    </svg>
  );
}

export function HeroVisual({ labels, caption }: { labels: Record<string, string>; caption: string }) {
  return (
    <div className="r-hero-visual" aria-label={caption} dir="ltr">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="r-hero-bg" src="/img/hero-bg.webp" srcSet="/img/hero-bg-sm.webp 900w, /img/hero-bg.webp 1280w" sizes="(max-width: 900px) 100vw, 640px" width={1280} height={720} alt="" />
      <svg className="r-hero-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {tiles.map((tile) => (
          <path
            key={tile.slug}
            d={`M${center.x} ${center.y} C ${(center.x + tile.x) / 2} ${center.y - 4}, ${(center.x + tile.x) / 2} ${tile.y + 4}, ${tile.x} ${tile.y}`}
          />
        ))}
      </svg>
      <div className="r-hero-core" style={{ left: `${center.x}%`, top: `${center.y}%` }} aria-hidden>
        <LogoMark id="hv" className="r-hero-core-mark" />
      </div>
      {tiles.map((tile) => (
        <div key={tile.slug} className="r-hero-tile" style={{ left: `${tile.x}%`, top: `${tile.y}%` }}>
          <span className="r-hero-tile-icon">
            <Icon name={tile.icon} />
          </span>
          <span>{labels[tile.slug]}</span>
        </div>
      ))}
    </div>
  );
}
