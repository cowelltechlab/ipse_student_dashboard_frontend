// UpdatedAssignmentStructuredEditors.tsx
import { Box, Heading, VStack } from "@chakra-ui/react";
import RichTextEditor from "../common/universal/EditableHTMLContentBox";

export type AssignmentJson = {
  assignmentInstructionsHtml: string;
  stepByStepPlanHtml: string;
  promptsHtml: string;
  supportTools: {
    toolsHtml: string;
    aiPromptingHtml: string;
    aiPolicyHtml: string;
  };
  motivationalMessageHtml: string;
};

export default function UpdatedAssignmentStructuredEditors({
  value,
  onChange,
}: {
  value: AssignmentJson;
  onChange: (next: AssignmentJson) => void;
}) {
  const set = <K extends keyof AssignmentJson>(k: K, v: string) =>
    onChange({ ...value, [k]: ensureFragment(v) } as AssignmentJson);

  const setST = <K extends keyof AssignmentJson["supportTools"]>(k: K, v: string) =>
    onChange({
      ...value,
      supportTools: { ...value.supportTools, [k]: ensureFragment(v) },
    });

  return (
    // Set a max height for the whole section and make it scrollable
    <Box maxH="66vh" overflowY="auto" pr={2}>
      <VStack align="stretch" gap={6}>
        <Box>
          <Heading size="sm" mb={2}>Assignment Instructions</Heading>
          <RichTextEditor
            value={value.assignmentInstructionsHtml}
            onChange={(html) => set("assignmentInstructionsHtml", html)}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Step-by-Step Plan</Heading>
          <RichTextEditor
            value={value.stepByStepPlanHtml}
            onChange={(html) => set("stepByStepPlanHtml", html)}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Prompts</Heading>
          <RichTextEditor
            value={value.promptsHtml}
            onChange={(html) => set("promptsHtml", html)}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Support Tools — toolsHtml</Heading>
          <RichTextEditor
            value={value.supportTools.toolsHtml}
            onChange={(html) => setST("toolsHtml", html)}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Support Tools — aiPromptingHtml</Heading>
          <RichTextEditor
            value={value.supportTools.aiPromptingHtml}
            onChange={(html) => setST("aiPromptingHtml", html)}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Support Tools — aiPolicyHtml</Heading>
          <RichTextEditor
            value={value.supportTools.aiPolicyHtml}
            onChange={(html) => setST("aiPolicyHtml", html)}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Motivational Message</Heading>
          <RichTextEditor
            value={value.motivationalMessageHtml}
            onChange={(html) => set("motivationalMessageHtml", html)}
          />
        </Box>
      </VStack>
    </Box>
  );
}

/** Minimal guard to keep fragments (no <html>/<body>/<head> if user pasted) */
function ensureFragment(s: string) {
  const lower = s.toLowerCase();
  if (
    lower.includes("<html") ||
    lower.includes("<body") ||
    lower.includes("<head") ||
    lower.includes("<!doctype")
  ) {
    const div = document.createElement("div");
    div.innerHTML = s;
    return div.innerHTML;
  }
  return s;
}
