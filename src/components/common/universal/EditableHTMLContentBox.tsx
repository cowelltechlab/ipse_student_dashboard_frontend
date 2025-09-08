import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  minHeightRem?: number; // default 8
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  minHeightRem = 8,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);

  // Keep Quill's document in sync with external value changes
  useEffect(() => {
    const quill = quillRef.current?.getEditor?.();
    if (!quill) return;

    const current = quill.root.innerHTML;
    // Only update if different to avoid cursor jumps while typing
    if (current !== value) {
      // "silent" avoids triggering onChange and causing loops
      quill.clipboard.dangerouslyPasteHTML(value || "", "silent");
    }
  }, [value]);

  return (
    <Box
      border="1px solid #244d8a"
      borderRadius="md"
      overflow="visible"
      className="rte"
      style={{ "--rte-min-height": `${minHeightRem}rem` } as React.CSSProperties}
    >
      <ReactQuill
        ref={quillRef}
        value={value}
        // ReactQuill calls onChange(content, delta, source, editor)
        // Our handler's first arg will be the HTML string we want.
        onChange={onChange}
        theme="snow"
        style={{ fontSize: "1.1rem", lineHeight: "1.6" }}
        modules={{
          toolbar: [
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
          "bullet",
          "link",
          "blockquote",
          "code-block",
        ]}
      />
    </Box>
  );
};

export default RichTextEditor;
