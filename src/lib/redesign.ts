import type { ServiceSlug } from "@/lib/services";

export const cardImg: Record<ServiceSlug, string> = {
  "ai-agents": "svc-agents",
  "conversational-ai": "svc-conversational",
  "ai-video-content": "svc-video",
  "ai-systems-automation": "svc-systems",
  "ai-strategy-consulting": "svc-strategy",
};

export const caseImgs = ["case-service", "case-ops", "case-content"] as const;
export const insightImgs = ["insight-usecases", "insight-strategy", "case-content"] as const;

export function imgProps(name: string, sizes: string, wide = false) {
  return {
    src: `/img/${name}.webp`,
    srcSet: `/img/${name}-sm.webp 640w, /img/${name}.webp 1280w`,
    sizes,
    width: wide ? 1280 : 864,
    height: wide ? 720 : 1152,
  } as const;
}
