import { Box, Heading, Stack } from "@chakra-ui/react";
import LoadingGenerationLottie from "./LoadingGenerationLottie";

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

const ProseBox = (props: React.ComponentProps<typeof Box>) => (
  <Box
    css={{
      "& h1": {
        fontSize: "4xl",
        fontWeight: "bold",
        lineHeight: "short",
        mt: 6,
        mb: 3,
      },
      "& h2": { fontSize: "3xl", fontWeight: "semibold", mt: 5, mb: 2 },
      "& h3": { fontSize: "2xl", fontWeight: "semibold", mt: 4, mb: 2 },
      "& h4": { fontSize: "xl", fontWeight: "semibold", mt: 3, mb: 2 },
      "& p": { mt: 2, mb: 2 },
      "& ul": { pl: 6, listStyle: "disc", my: 2 },
      "& ol": { pl: 6, listStyle: "decimal", my: 2 },
      "& li": { my: 1 },
      "& a": { color: "blue.600", textDecoration: "underline" },
      "& code": { px: 1, py: 0.5, borderRadius: "md", bg: "gray.100" },
      "& pre": {
        p: 3,
        borderRadius: "md",
        bg: "gray.800",
        color: "white",
        overflowX: "auto",
        my: 3,
      },
    }}
    {...props}
  />
);

const HtmlBlock = ({ html }: { html?: string }) => {
  if (!html) return null;
  return (
    <ProseBox
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
        // borderWidth="1px"
        // borderRadius="md"
        // borderColor={"#244d8a"}
        w={"100%"}
        h={"66vh"
          
        }
        overflow={"auto"}
      >
        {isLoading && <LoadingGenerationLottie />}
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
