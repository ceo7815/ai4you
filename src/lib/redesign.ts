import type { ServiceSlug } from "@/lib/services";

/** Generated photoreal card art. WebP, 1024w and 512w. */
export const cardImg: Record<ServiceSlug, string> = {
  "ai-agents": "svc-agents",
  "conversational-ai": "svc-conversational",
  "ai-video-content": "svc-video",
  "ai-systems-automation": "svc-systems",
  "ai-strategy-consulting": "svc-strategy",
};
export const caseImgs = ["case-1", "case-2", "case-3"] as const;
export const insightImgs = ["insight-1", "insight-2", "insight-3"] as const;

export function imgProps(name: string, sizes: string) {
  return {
    src: `/img/${name}.webp`,
    srcSet: `/img/${name}-sm.webp 512w, /img/${name}.webp 1024w`,
    sizes,
    width: 1024,
    height: 768,
  } as const;
}
