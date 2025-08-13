// EditableHTMLContentBox (RichTextEditor).tsx
import React from "react";
import { Box } from "@chakra-ui/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import "./RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  /** Optional: minimum visible height for empty editors */
  minHeightRem?: number; // default 8
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  minHeightRem = 8,
}) => {
  return (
    <Box
      border="1px solid #244d8a"
      borderRadius="md"
      overflow="visible"
      className="rte"
      style={
        { "--rte-min-height": `${minHeightRem}rem` } as React.CSSProperties
      }
    >
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        // No fixed height here — let CSS handle auto height
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
        }}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "blockquote", "code-block"],
            ["clean"],
          ],
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
