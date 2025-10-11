import { Box, VStack, Text, Badge, Heading } from "@chakra-ui/react";
import type { GeneratedOption } from "../../types/AssignmentVersionTypes";

interface VersionOptionsDisplaySectionProps {
  generatedOptions: GeneratedOption[];
  selectedOptions: string[];
  additionalSuggestions: string;
  skillsForSuccess: string;
}

const VersionOptionsDisplaySection = ({
  generatedOptions,
  selectedOptions,
  additionalSuggestions,
  skillsForSuccess,
}: VersionOptionsDisplaySectionProps) => {
  // Filter to show only selected options
  const selectedGeneratedOptions = generatedOptions.filter((option) =>
    selectedOptions.includes(option.internal_id || option.name)
  );

  return (
    <VStack align="stretch" gap={4}>
      {/* Skills for Success */}
      {skillsForSuccess && (
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="md"
          borderColor="gray.200"
          bg="white"
        >
          <Heading size="sm" mb={2}>
            Skills for Success
          </Heading>
          <Text fontSize="sm" whiteSpace="pre-wrap">
            {skillsForSuccess}
          </Text>
        </Box>
      )}

      {/* Selected Learning Pathways */}
      {selectedGeneratedOptions.length > 0 && (
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="md"
          borderColor="gray.200"
          bg="white"
        >
          <Heading size="sm" mb={3}>
            Selected Learning Pathways
          </Heading>
          <VStack align="stretch" gap={3}>
            {selectedGeneratedOptions.map((option, index) => (
              <Box
                key={option.internal_id || option.name || index}
                p={3}
                borderWidth="1px"
                borderRadius="md"
                borderColor="blue.200"
                bg="blue.50"
              >
                <Badge colorScheme="blue" mb={2}>
                  Selected
                </Badge>
                <Heading size="xs" mb={2}>
                  {option.name}
                </Heading>
                <Text fontSize="sm" color="gray.700" mb={2}>
                  {option.description}
                </Text>

                {/* Why Good sections */}
                {option.why_good_existing && (
                  <Box mt={2}>
                    <Text fontSize="xs" fontWeight="semibold" color="gray.600">
                      Why This Works for Your Existing Skills:
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {option.why_good_existing}
                    </Text>
                  </Box>
                )}

                {option.why_good_growth && (
                  <Box mt={2}>
                    <Text fontSize="xs" fontWeight="semibold" color="gray.600">
                      How This Helps You Grow:
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {option.why_good_growth}
                    </Text>
                  </Box>
                )}

                {option.why_challenge && (
                  <Box mt={2}>
                    <Text fontSize="xs" fontWeight="semibold" color="gray.600">
                      Potential Challenges:
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {option.why_challenge}
                    </Text>
                  </Box>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      )}

      {/* Additional Suggestions / Ideas for Changes */}
      {additionalSuggestions && (
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="md"
          borderColor="gray.200"
          bg="white"
        >
          <Heading size="sm" mb={2}>
            Student's Additional Ideas
          </Heading>
          <Text fontSize="sm" whiteSpace="pre-wrap">
            {additionalSuggestions}
          </Text>
        </Box>
      )}

      {/* Empty state if nothing to display */}
      {!skillsForSuccess &&
        selectedGeneratedOptions.length === 0 &&
        !additionalSuggestions && (
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.200"
            bg="gray.50"
            textAlign="center"
          >
            <Text fontSize="sm" color="gray.500">
              No options or comments were recorded for this version.
            </Text>
          </Box>
        )}
    </VStack>
  );
};

export default VersionOptionsDisplaySection;
