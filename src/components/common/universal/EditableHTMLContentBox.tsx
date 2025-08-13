import React from "react";
import { Box } from "@chakra-ui/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import "./RichTextEditor.css";


interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  height?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  height = "80vh",
}) => {
  return (
    <Box border="1px solid #244d8a" borderRadius="md" overflow="hidden">
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        style={{
          height: `calc(${height} - 42px)`,
          fontSize: "1.1rem", // Default font size
          lineHeight: "1.6", // Optional readability
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
