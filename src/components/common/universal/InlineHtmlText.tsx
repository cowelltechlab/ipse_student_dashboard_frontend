import { Box, type BoxProps } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import type { Config } from "dompurify";

const INLINE_HTML_OPTS: Config = {
  ALLOWED_TAGS: ["b", "strong", "i", "em", "br"],
  ALLOWED_ATTR: [],
};

function sanitizeInlineHtml(html: string): string {
  return String(DOMPurify.sanitize(html ?? "", INLINE_HTML_OPTS));
}

const InlineHtmlText = ({ html, ...boxProps }: { html: string } & BoxProps) => (
  <Box
    {...boxProps}
    dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(html) }}
    css={{
      "& b, & strong": { fontWeight: "bold" },
    }}
  />
);

export default InlineHtmlText;
