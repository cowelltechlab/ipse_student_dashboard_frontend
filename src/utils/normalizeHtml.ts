export function stripMarkdownFences(s: string): string {
  // Remove leading/trailing ``` (with optional "html")
  return s.replace(/^```(?:html)?\s*/i, "").replace(/\s*```$/i, "");
}
