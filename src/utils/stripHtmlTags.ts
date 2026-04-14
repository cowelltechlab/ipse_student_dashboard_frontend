/** Plain text for alt text, keys, etc. Not a security sanitizer. */
export function stripHtmlTags(s: string): string {
  return String(s ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
