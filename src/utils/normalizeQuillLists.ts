export function normalizeQuillLists(html: string): string {
  let out = html;

  // Quill often encodes bullets as <ol><li data-list="bullet">...</li></ol>
  // Convert those to a semantic <ul>
  out = out.replace(/<ol([^>]*)>([\s\S]*?)<\/ol>/gi, (m, attrs, inner) => {
    // If any top-level li carries data-list="bullet", treat as <ul>
    const hasBullet = /<li[^>]*\sdata-list="bullet"[^>]*>/i.test(inner);
    return hasBullet ? `<ul${attrs}>${inner}</ul>` : m;
  });

  // Remove editor-only artifacts
  out = out.replace(/<span class="ql-ui"[^>]*><\/span>/gi, "");
  out = out.replace(/\sdata-list="[^"]*"/gi, "");
  out = out.replace(/\scontenteditable="[^"]*"/gi, "");

  // Fix illegal nesting: ensure sub-<ul>/<ol> lives inside its parent's <li>
  // (simple pass: wrap stray list siblings into previous <li>, best-effort)
  out = out.replace(/<\/li>\s*(<ul|<ol)/gi, (_, listStart) => `\n${listStart}`);
  out = out.replace(/(<\/ul>|<\/ol>)\s*(<ul|<ol)/gi, "$1<li>$2"); // rare edge

  return out;
}

