/** [TBC] Business number (spec 14, item 5). Prefilled message per locale comes from messages. */
export function whatsappHref(text: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971XXXXXXXXX";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
