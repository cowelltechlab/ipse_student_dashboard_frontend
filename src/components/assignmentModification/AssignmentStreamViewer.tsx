// components/AssignmentStreamViewer.tsx
import { Box, Flex, Heading, Stack, Text, Image } from "@chakra-ui/react";
// import DOMPurify from 'dompurify'; // optional
import modifiedAssignmentIcon from "../../assets/icons/note.png";

type Props = {
  sections: {
    assignmentInstructionsHtml?: string;
    stepByStepPlanHtml?: string;
    myPlanChecklistHtml?: string;
    motivationalMessageHtml?: string;
    promptsHtml?: string;
    supportTools?: {
      toolsHtml: string;
      aiPromptingHtml?: string;
      aiPolicyHtml: string;
    };
    template?: {
      title: string;
      bodyHtml: string;
    };
  };
  isLoading: boolean;
};

const HtmlBlock = ({ html }: { html?: string }) => {
  if (!html) return null;
  // const safe = DOMPurify.sanitize(html);
  return (
    <Box
      px={4}
      py={3}
      borderWidth="1px"
      borderRadius="md"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default function AssignmentStreamViewer({ sections, isLoading }: Props) {
  const {
    assignmentInstructionsHtml,
    stepByStepPlanHtml,
    myPlanChecklistHtml,
    motivationalMessageHtml,
    promptsHtml,
    supportTools,
    template,
  } = sections;

  return (
    <Stack spaceY={6}>
      <Box
        borderWidth="1px"
        borderRadius="md"
        borderColor={"#244d8a"}
        w={"100%"}
      >
        <Flex
          bg="#244d8a"
          color="white"
          px={4}
          py={2}
          align="center"
          justify="space-between"
          borderTopRadius="md"
        >
          <Image src={modifiedAssignmentIcon} height={"50px"} />
          <Heading>Modified Assignment</Heading>
        </Flex>
        <Heading size="md">Streaming Preview</Heading>
        {isLoading && <Text color="gray.600">Generating live…</Text>}

        <HtmlBlock html={assignmentInstructionsHtml} />
        <HtmlBlock html={stepByStepPlanHtml} />
        <HtmlBlock html={myPlanChecklistHtml} />
        <HtmlBlock html={motivationalMessageHtml} />
        <HtmlBlock html={promptsHtml} />

        {template && (
          <Box>
            <Heading size="sm" mb={2}>
              {template.title}
            </Heading>
            <HtmlBlock html={template.bodyHtml} />
          </Box>
        )}

        {supportTools && (
          <Box>
            <HtmlBlock html={supportTools.toolsHtml} />
            {supportTools.aiPromptingHtml && (
              <HtmlBlock html={supportTools.aiPromptingHtml} />
            )}
            <HtmlBlock html={supportTools.aiPolicyHtml} />
          </Box>
        )}
      </Box>
    </Stack>
  );
}
