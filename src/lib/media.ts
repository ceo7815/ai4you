import type { ServiceSlug } from "@/lib/services";

/** Generated atmosphere. No people, no logos, no claims. */
export const heroArt = "/media/hero.jpg";
export const filmPoster = "/media/film-still.jpg";

export const serviceArt: Record<ServiceSlug, string> = {
  "ai-agents": "/media/agents-task.jpg",
  "conversational-ai": "/media/conversation-chat.jpg",
  "ai-video-content": "/media/film-frames.jpg",
  "ai-systems-automation": "/media/systems-loop.jpg",
  "ai-strategy-consulting": "/media/strategy-runs-all.jpg",
};
