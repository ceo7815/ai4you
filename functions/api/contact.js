const services = ["ai-agents", "conversational-ai", "ai-video-content", "ai-systems-automation", "ai-strategy-consulting", "not-sure"];

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

/** Pages stand-in for the form. Logs the lead until a delivery provider is supplied. */
export async function onRequestPost(context) {
  const form = await context.request.formData();
  if (String(form.get("company_website") ?? "").length > 0) return json({ status: "success" });

  const prefix = String(form.get("prefix") ?? "+971");
  const local = String(form.get("phone") ?? "").replace(/[^\d]/g, "").replace(/^0+/, "");
  const phone = local ? `${prefix}${local}` : "";
  const name = String(form.get("name") ?? "").trim();
  const business = String(form.get("business") ?? "").trim();
  const interest = String(form.get("interest") ?? "");
  const locale = String(form.get("locale") ?? "en");
  const fields = {};

  if (!name || name.length > 120) fields.name = "required";
  if (!business || business.length > 160) fields.business = "required";
  if (!services.includes(interest)) fields.interest = "required";
  if (!/^\+[1-9]\d{6,14}$/.test(phone)) fields.phone = local ? "phone" : "required";
  if (locale !== "en" && locale !== "ar") fields.locale = "required";

  if (Object.keys(fields).length > 0) return json({ status: "error", fields });

  console.info(
    "[contact] lead",
    JSON.stringify({
      name,
      phone,
      business,
      interest,
      message: String(form.get("message") ?? "").trim() || undefined,
      locale,
      page: String(form.get("page") ?? "/").slice(0, 200),
      utm: String(form.get("utm") ?? "").slice(0, 500) || undefined,
      timestamp: new Date().toISOString(),
    }),
  );

  return json({ status: "success" });
}
