import type { ServiceSlug } from "@/lib/services";

/** Positions are percent of the cropped 3D hub image (labels sit in the lower half of each glass card). */
const tiles: { slug: ServiceSlug; x: number; y: number }[] = [
  { slug: "ai-agents", x: 36.2, y: 28.2 },
  { slug: "conversational-ai", x: 74.8, y: 28.2 },
  { slug: "ai-video-content", x: 24.3, y: 61.5 },
  { slug: "ai-systems-automation", x: 87.0, y: 61.5 },
  { slug: "ai-strategy-consulting", x: 54.5, y: 85.0 },
];

export function HeroVisual({ labels, caption }: { labels: Record<string, string>; caption: string }) {
  return (
    <div className="r-hero-visual" aria-label={caption}>
      <div className="r-hero-hub" dir="ltr">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="r-hero-bg"
          src="/img/hero-hub.webp"
          srcSet="/img/hero-hub-sm.webp 900w, /img/hero-hub.webp 1043w"
          sizes="(max-width: 959px) 100vw, 62vw"
          width={1043}
          height={612}
          alt=""
        />
        {tiles.map((tile) => (
          <span key={tile.slug} className="r-hero-label" style={{ left: `${tile.x}%`, top: `${tile.y}%` }}>
            {labels[tile.slug]}
          </span>
        ))}
      </div>
    </div>
  );
}
