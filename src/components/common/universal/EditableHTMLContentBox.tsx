import React, { useEffect, useRef, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  minHeightRem?: number; // default 8
  readOnly?: boolean; // default false
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  minHeightRem = 8,
  readOnly = false,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const isUpdatingFromProp = useRef(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Normalize HTML for comparison to avoid minor formatting differences
  const normalizeHtml = useCallback((html: string) => {
    return html
      .replace(/\s+/g, ' ') // normalize whitespace
      .replace(/> </g, '><') // remove spaces between tags
      .trim();
  }, []);

  // Keep Quill's document in sync with external value changes
  useEffect(() => {
    const quill = quillRef.current?.getEditor?.();
    if (!quill) return;

    const current = quill.root.innerHTML;
    // Normalize both values for comparison to handle minor formatting differences
    const normalizedCurrent = normalizeHtml(current);
    const normalizedValue = normalizeHtml(value || "");

    // Only update if different and not currently updating from our own onChange
    if (normalizedCurrent !== normalizedValue && !isUpdatingFromProp.current) {
      isUpdatingFromProp.current = true;
      // "silent" avoids triggering onChange and causing loops
      quill.clipboard.dangerouslyPasteHTML(value || "", "silent");
      // Reset flag after a short delay to allow for DOM updates
      setTimeout(() => {
        isUpdatingFromProp.current = false;
      }, 0);
    }
  }, [value, normalizeHtml]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <Box
      border={readOnly ? "1px solid #e2e8f0" : "1px solid #244d8a"}
      borderRadius="md"
      overflow="visible"
      className="rte"
      bg={readOnly ? "gray.50" : "white"}
      opacity={readOnly ? 0.8 : 1}
      style={{ "--rte-min-height": `${minHeightRem}rem` } as React.CSSProperties}
    >
      <ReactQuill
        ref={quillRef}
        value={value}
        // ReactQuill calls onChange(content, delta, source, editor)
        // Our handler's first arg will be the HTML string we want.
        onChange={(content) => {
          // Only call onChange if this isn't a programmatic update
          if (!isUpdatingFromProp.current) {
            // Debounce rapid changes to prevent infinite loops
            if (debounceTimer.current) {
              clearTimeout(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
              onChange(content);
            }, 100); // 100ms debounce
          }
        }}
        readOnly={readOnly}
        theme="snow"
        style={{ fontSize: "1.1rem", lineHeight: "1.6" }}
        modules={{
          toolbar: readOnly ? false : [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "blockquote", "code-block"],
            ["clean"],
          ],
          // prevent Quill from normalizing whitespace aggressively
          history: { delay: 300, maxStack: 100, userOnly: true },
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "color",
          "background",
          "list",
          "link",
          "blockquote",
          "code-block",
        ]}
      />
    </Box>
  );
};

export default RichTextEditor;
