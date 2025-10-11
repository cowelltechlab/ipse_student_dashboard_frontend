import {
  Box,
  VStack,
  Text,
  Heading,
  Flex,
  Image,
  Stack,
  Accordion,
  List,
} from "@chakra-ui/react";
import type { GeneratedOption } from "../../types/AssignmentVersionTypes";
import { IoMdArrowRoundForward } from "react-icons/io";
import skillsIcon from "../../assets/icons/logical-thinking.png";
import thinkingIcon from "../../assets/icons/design-thinking.png";
import ideasIcon from "../../assets/icons/like.png";

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
    <VStack>
      {/* Skills for Success */}
      {skillsForSuccess && (
        <Box borderWidth="1px" borderRadius="md" borderColor="#244d8a" w="100%">
          <Flex
            bg="#244d8a"
            color="white"
            px={4}
            py={2}
            align="center"
            justify="space-between"
            borderTopRadius="md"
          >
            <Image src={skillsIcon} height="50px" />
            <Heading>Skills for Success</Heading>
          </Flex>

          <Box px={4} py={3} bg="white" w="100%">
            <Text color="#244d8a">{skillsForSuccess}</Text>
          </Box>
        </Box>
      )}
      {/* Selected Learning Pathways */}
      {selectedGeneratedOptions.length > 0 && (
        <Box
          borderWidth="1px"
          borderRadius="md"
          borderColor="#244d8a"
          overflow="hidden"
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
            <Image src={thinkingIcon} height="50px" />
            <Heading>Selected Learning Pathways</Heading>
          </Flex>
          <Box px={4} py={6} bg="blue.100" borderRadius="md" boxShadow="sm">
            <Stack gap="4">
              <Accordion.Root
                collapsible
                defaultValue={[selectedGeneratedOptions[0]?.internal_id || "0"]}
              >
                {selectedGeneratedOptions.map((option, index) => (
                  <Accordion.Item
                    key={option.internal_id || option.name || index}
                    value={option.internal_id || index.toString()}
                  >
                    <Accordion.ItemTrigger
                      bg="white"
                      p={2}
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      <Text flex="1" color="#244d8a" fontWeight="bold">
                        {option.name}
                      </Text>
                      <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>

                    <Accordion.ItemContent w="100%">
                      <Accordion.ItemBody
                        w="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <Text
                          fontWeight="bold"
                          color="#244d8a"
                          textAlign="left"
                          w="100%"
                        >
                          {option.description}
                        </Text>
                        <List.Root mt={2} gap={2} w="100%">
                          {option.why_good_existing && (
                            <List.Item
                              color="black"
                              display="flex"
                              alignItems="start"
                              textAlign="left"
                              w="100%"
                            >
                              <List.Indicator asChild color="#244d8a">
                                <IoMdArrowRoundForward />
                              </List.Indicator>
                              <Box flex="1">{option.why_good_existing}</Box>
                            </List.Item>
                          )}
                          {option.why_challenge && (
                            <List.Item
                              color="black"
                              display="flex"
                              alignItems="start"
                              textAlign="left"
                              w="100%"
                            >
                              <List.Indicator asChild color="#244d8a">
                                <IoMdArrowRoundForward />
                              </List.Indicator>
                              <Box flex="1">{option.why_challenge}</Box>
                            </List.Item>
                          )}
                          {option.why_good_growth && (
                            <List.Item
                              color="black"
                              display="flex"
                              alignItems="start"
                              textAlign="left"
                              w="100%"
                            >
                              <List.Indicator asChild color="#244d8a">
                                <IoMdArrowRoundForward />
                              </List.Indicator>
                              <Box flex="1">{option.why_good_growth}</Box>
                            </List.Item>
                          )}
                        </List.Root>
                      </Accordion.ItemBody>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </Stack>
          </Box>
        </Box>
      )}
      {/* Additional Suggestions / Ideas for Changes */}
      <Box borderWidth="1px" borderRadius="md" borderColor="#244d8a" w="100%">
        <Flex
          bg="#244d8a"
          color="white"
          px={4}
          py={2}
          align="center"
          justify="space-between"
          borderTopRadius="md"
        >
          <Image src={ideasIcon} height="50px" />
          <Heading>Selected Additional Ideas for Changes</Heading>
        </Flex>

        <Box px={4} py={3} bg="blue.100" w="100%">
          {additionalSuggestions ? (
            <Text color="#244d8a" whiteSpace="pre-wrap">
              {additionalSuggestions}
            </Text>
          ) : (
            <Text color="black" whiteSpace="pre-wrap">
              No additional Suggestions entered for this assignment version
            </Text>
          )}
        </Box>
      </Box>
      
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
