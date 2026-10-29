import { z } from "zod";
import { serviceSlugs } from "@/lib/services";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{6,14}$/),
  business: z.string().trim().min(1).max(160),
  interest: z.enum([...serviceSlugs, "not-sure"]),
  message: z.string().trim().max(2000).optional(),
  locale: z.enum(["en", "ar"]),
  page: z.string().max(200),
  utm: z.string().max(500).optional(),
});

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      fields: Partial<Record<"name" | "phone" | "business" | "interest", "required" | "phone">>;
      server?: boolean;
    };

type Lead = z.infer<typeof schema>;

/** Same checks as the Pages function. Delivery stays a log until a provider is supplied. */
export function parseLead(formData: FormData): { state: ContactState; lead?: Lead } {
  if (String(formData.get("company_website") ?? "").length > 0) return { state: { status: "success" } };

  const prefix = String(formData.get("prefix") ?? "+971");
  const local = String(formData.get("phone") ?? "").replace(/[^\d]/g, "").replace(/^0+/, "");
  const raw = {
    name: String(formData.get("name") ?? ""),
    phone: local ? `${prefix}${local}` : "",
    business: String(formData.get("business") ?? ""),
    interest: String(formData.get("interest") ?? ""),
    message: String(formData.get("message") ?? "") || undefined,
    locale: String(formData.get("locale") ?? "en"),
    page: String(formData.get("page") ?? "/"),
    utm: String(formData.get("utm") ?? "") || undefined,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fields: Extract<ContactState, { status: "error" }>["fields"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "business" || key === "interest") fields[key] = "required";
      if (key === "phone") fields.phone = local ? "phone" : "required";
    }
    return { state: { status: "error", fields } };
  }

  return { state: { status: "success" }, lead: parsed.data };
}
