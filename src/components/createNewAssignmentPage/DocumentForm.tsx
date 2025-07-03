import { 
    VStack, 
    Fieldset, 
    Field, 
    Input, 
    Box, 
    NativeSelect, 
    For, 
    Icon, 
    Flex, 
    RadioGroup, 
    Stack,
    Text
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";


const DocumentForm = () => {
    // TODO: Add conditional for boxes being red if neither is selected
    const assignmentTypes = [
        "Individual project",
        "Group project",
        "Test",
        "Essay",
        "Other"
    ];

    return (
        <VStack flex="1" align="stretch">
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
                  width={{ base: "100%", md: "60%" }}
                  appearance="none"
                />
              </Field.Root>

              <Field.Root mt={4}>
                <Field.Label fontWeight="bold">
                  Select Assignment Type
                </Field.Label>
                <Box position="relative" width={{ base: "100%", md: "60%" }}>
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
              
              <Field.Root mt={4}>
                <Flex 
                  align="center" 
                  gap={4} 
                  width={{ base: "100%", md: "60%" }}
                  justify="space-between"
                >
                  <Field.Label fontWeight="bold" mr={4}>
                    <Text>
                      Is this for an Inclusive class?<Text as="span" color="red">*</Text>
                    </Text>
                  </Field.Label>
                  <RadioGroup.Root>
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
    );
}

export default DocumentForm;