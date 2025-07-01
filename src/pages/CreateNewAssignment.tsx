import {
  Box,
  Separator,
  Flex,
  VStack,
  Text,
  Fieldset,
  // Stack,
  Field,
  NativeSelect,
  Input,
  For,
  RadioGroup,
  Stack,
  Icon
  // FormLabel,
  // Select,
  // option
} from "@chakra-ui/react";
import { IoAddCircleSharp } from "react-icons/io5";
import CreateNewAssignmentIcon from "../assets/Create New Assignment.svg"
import PageHeader from "../components/common/pageHeader/PageHeader";
import HeaderCard from "../components/common/pageHeader/HeaderCard";
import { FaChevronDown } from "react-icons/fa";
// import HomeContent from "../components/homeDashboard/HomeContent";

const CreateNewAssignment = () => {
  const cardText = `Create an assignment that adapts and grows to support every
                     student's needs. Let's make learning accessible for all!`;

  const assignmentTypes = ["Homework", "Essay", "Quiz", "Project"];

  return (
    <Box>
      <PageHeader />
      <HeaderCard 
        cardHeading="Create Assignment" 
        cardText={cardText} 
        cardImageUrl={CreateNewAssignmentIcon}
      />

      <Separator variant="solid" />

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        gap={8}
        p={6}
        mx="auto"
        // maxWidth="1200px"
        mt={8}
      >
        <VStack 
          flex="1"
           padding={10}
          borderRadius="md"
          textAlign="center"
          align="center"
          justify="center" 
          color="white"
          bg="#EAF2FF"
        >
          <Box>
            <IoAddCircleSharp color="#BD4F23" size={44} />
          </Box>
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            Upload Assignment
          </Text>
          <Text fontSize="sm" color="gray.600">
            Upload documents to modify, e.g. assignments, tests, slides.
          </Text>
          <Text fontSize="sm" color="gray.500">
            Accepted formats: Pdf, Word doc.
          </Text>
        </VStack>
        <VStack flex="1">
          <Fieldset.Root>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label fontWeight="bold">Document Name</Field.Label>
                <Input 
                  placeholder="Enter name for the document..." 
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  _hover={{
                    borderColor: "gray.300",
                  }}
                  width="60%"
                  appearance="none"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label fontWeight="bold">Select Assignment Type</Field.Label>
                <Box position="relative" width="60%">
                  <NativeSelect.Root>
                    <NativeSelect.Field 
                      name="assignment-type"
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                      _hover={{
                        borderColor: "gray.300",
                      }}
                      appearance="none"
                    >
                      <option 
                        defaultValue="" 
                        disabled 
                        // selected 
                        hidden
                      >
                        Select type
                      </option>

                      <For each={assignmentTypes}>
                        {(item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )}
                      </For>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                  <Icon
                    as={FaChevronDown}
                    position="absolute"
                    right="3"
                    top="30%"
                    pointerEvents="none"
                    color="gray.500"
                    boxSize="4"
                  />
                </Box>
              </Field.Root>
              
              <Field.Root>
                <Flex align="center" gap={4} width="60%" justify="space-between">
                  <Field.Label fontWeight="bold" mr={4}>
                    <Text>
                      Is this for an Inclusive class?<Text as="span" color="red">*</Text>
                    </Text>
                  </Field.Label>
                  <RadioGroup.Root defaultValue="no">
                    <Stack direction="row">
                      <RadioGroup.Item key="yes" value="yes">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator 
                          borderRadius="2px" 
                          borderColor="gray.400"
                          _checked={{
                            bg: "blue.500",
                            borderColor: "blue.500",
                          }}
                        />
                        <RadioGroup.ItemText>Yes</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item key="no" value="no">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator 
                          borderRadius="2px" 
                          borderColor="gray.400"
                          _checked={{
                            bg: "blue.500",
                            borderColor: "blue.500",
                          }}
                        />
                        <RadioGroup.ItemText>No</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </Stack>
                  </RadioGroup.Root>
                </Flex>
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        </VStack>
      </Flex>

      {/* <HomeContent /> */}
    </Box>
  );
};

export default CreateNewAssignment;