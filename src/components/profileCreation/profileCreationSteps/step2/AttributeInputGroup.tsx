import {
  Box,
  Heading,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

interface AttributeInputGroupProps {
  attributeName: string;
  attributes: string[];
  setAttributes: (attributes: string[]) => void;
  header: string;
  subheader: string;
}

const AttributeInputGroup = ({
  attributeName,
  attributes,
  setAttributes,
  header,
  subheader,
}: AttributeInputGroupProps) => {
  const handleChange = (index: number, value: string) => {
    const updated = [...attributes];
    updated[index] = value;
    setAttributes(updated);
  };

  return (
    <Box mt={10} w={"100%"}>
      <VStack>
        <Heading fontSize="md">{header}</Heading>
        <Text fontSize={"sm"} color="gray.500" mt={1}>
          {subheader}
        </Text>
      </VStack>

      <SimpleGrid
        minChildWidth="400px"
        // columns={{ base: 1, sm: 2 }}
        gap="20px"
        mt={4}
      >
        {[0, 1, 2, 3].map((i) => (
          <Input
            key={i}
            placeholder={`Type ${attributeName}...`}
            value={attributes[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AttributeInputGroup;
