import { Box, Heading, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
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
  const set = useCallback(<K extends keyof AssignmentJson>(k: K, v: string) => {
    const updatedValue = { ...value, [k]: ensureFragment(v) } as AssignmentJson;
    onChange(updatedValue);
  }, [value, onChange]);

  const setST = useCallback(<K extends keyof AssignmentJson["supportTools"]>(k: K, v: string) => {
    const updatedValue = {
      ...value,
      supportTools: { ...value.supportTools, [k]: ensureFragment(v) },
    };
    onChange(updatedValue);
  }, [value, onChange]);

  // Create stable onChange handlers for each field
  const onAssignmentInstructionsChange = useCallback((html: string) =>
    set("assignmentInstructionsHtml", html), [set]);

  const onStepByStepPlanChange = useCallback((html: string) =>
    set("stepByStepPlanHtml", html), [set]);

  const onPromptsChange = useCallback((html: string) =>
    set("promptsHtml", html), [set]);

  const onToolsChange = useCallback((html: string) =>
    setST("toolsHtml", html), [setST]);

  const onAiPromptingChange = useCallback((html: string) =>
    setST("aiPromptingHtml", html), [setST]);

  const onAiPolicyChange = useCallback((html: string) =>
    setST("aiPolicyHtml", html), [setST]);

  const onMotivationalMessageChange = useCallback((html: string) =>
    set("motivationalMessageHtml", html), [set]);

  return (
    // Set a max height for the whole section and make it scrollable
    <Box maxH="66vh" overflowY="auto" pr={2}>
      <VStack align="stretch" gap={6}>
        <Box>
          <Heading size="sm" mb={2}>Assignment Instructions</Heading>
          <RichTextEditor
            value={value.assignmentInstructionsHtml}
            onChange={onAssignmentInstructionsChange}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Step-by-Step Plan</Heading>
          <RichTextEditor
            value={value.stepByStepPlanHtml}
            onChange={onStepByStepPlanChange}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Prompts</Heading>
          <RichTextEditor
            value={value.promptsHtml}
            onChange={onPromptsChange}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Support Tools</Heading>
          <RichTextEditor
            value={value.supportTools.toolsHtml}
            onChange={onToolsChange}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>AI Prompt Ideas</Heading>
          <RichTextEditor
            value={value.supportTools.aiPromptingHtml}
            onChange={onAiPromptingChange}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>AI Policy</Heading>
          <RichTextEditor
            readOnly
            value={value.supportTools.aiPolicyHtml}
            onChange={onAiPolicyChange}
          />
        </Box>

        <Box>
          <Heading size="sm" mb={2}>Motivational Message</Heading>
          <RichTextEditor
            value={value.motivationalMessageHtml}
            onChange={onMotivationalMessageChange}
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
