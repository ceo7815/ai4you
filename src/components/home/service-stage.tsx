import Image from "next/image";
import type { ServiceSlug } from "@/lib/services";
import { serviceArt } from "@/lib/media";

const stageFocus: Partial<Record<ServiceSlug, string>> = {
  "ai-strategy-consulting": "object-[72%_center]",
};

/** Photographic stage for a service row. Decorative, no product claims. */
export function ServiceStage({ slug }: { slug: ServiceSlug }) {
  return (
    <div className="p-0 lg:p-8">
      <div className="relative min-h-80 overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgb(10_108_255_/_0.65)] lg:min-h-[26rem]">
        <Image
          src={serviceArt[slug]}
          alt=""
          fill
          sizes="(min-width: 64rem) 40vw, 100vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${stageFocus[slug] ?? ""}`}
        />
      </div>
    </div>
  );
}
