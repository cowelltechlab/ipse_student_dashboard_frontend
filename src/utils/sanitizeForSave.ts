import DOMPurify from "dompurify";
import { stripMarkdownFences } from "./normalizeHtml";
import { normalizeQuillLists } from "./normalizeQuillLists";


export function sanitizeForSave(html: string): string {
  const noFences = stripMarkdownFences(html.trim());
  const normalized = normalizeQuillLists(noFences);
  return DOMPurify.sanitize(normalized, { USE_PROFILES: { html: true } });
}
