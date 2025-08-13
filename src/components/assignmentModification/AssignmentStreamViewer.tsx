// components/AssignmentStreamViewer.tsx
import { Box, Flex, Heading, Stack, Text, Image } from "@chakra-ui/react";
// import DOMPurify from 'dompurify'; // optional
import modifiedAssignmentIcon from "../../assets/icons/note.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
        {isLoading && (
          <Box textAlign="center" py={10}>
            <DotLottieReact
              src="https://lottie.host/749207af-f4b1-47e3-8768-449bb1d7e5c5/66y1ECtWZR.lottie"
              loop
              autoplay
              height={"100px"}
            />
            <Text>Generating The Ideal Modified Assignment</Text>
          </Box>

        )}

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
