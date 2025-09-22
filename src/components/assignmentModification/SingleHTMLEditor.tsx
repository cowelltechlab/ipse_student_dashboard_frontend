import { Box } from "@chakra-ui/react";
import RichTextEditor from "../common/universal/EditableHTMLContentBox";

interface SingleHTMLEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function SingleHTMLEditor({
  value,
  onChange,
}: SingleHTMLEditorProps) {
  return (
    <Box maxH="66vh" overflowY="auto" pr={2}>
      <RichTextEditor
        value={value}
        onChange={onChange}
        minHeightRem={20}
      />
    </Box>
  );
}