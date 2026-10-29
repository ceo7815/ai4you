import type { LucideIcon } from "lucide-react";
import { Bot, Clapperboard, Compass, MessagesSquare, Workflow } from "lucide-react";

/** Spec 5: the five services, in menu order. Slugs are English in both locales. */
export const serviceSlugs = [
  "ai-agents",
  "conversational-ai",
  "ai-video-content",
  "ai-systems-automation",
  "ai-strategy-consulting",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "ai-agents": Bot,
  "conversational-ai": MessagesSquare,
  "ai-video-content": Clapperboard,
  "ai-systems-automation": Workflow,
  "ai-strategy-consulting": Compass,
};

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}
