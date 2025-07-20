import {
  Box,
  Heading,
  Image,
  VStack,
  Textarea,
  Input,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { Tooltip } from "../../ui/tooltip";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";

interface EditableProfileInfoBoxProps<T extends string | string[]> {
  title: string;
  titleIcon?: string;
  value: T;
  onChange: (val: T) => void;
}


const EditableProfileInfoBox = <T extends string | string[]>({
  title,
  titleIcon,
  value,
  onChange,
}: EditableProfileInfoBoxProps<T>) => {
  const isArray = Array.isArray(value);
  const safeArray: string[] = isArray ? (value as string[]) : [];
  const minLength = 3;

  const handleChange = (index: number, newVal: string) => {
    const updated = [...safeArray];
    updated[index] = newVal;
    onChange(updated as T);
  };

  const handleRemove = (index: number) => {
    if (safeArray.length > minLength) {
      const updated = [...safeArray];
      updated.splice(index, 1);
      onChange(updated as T);
    }
  };

  const handleAdd = () => {
    onChange([...safeArray, ""] as T);
  };

  return (
    <Box bg="#eaeef4" p={4} borderRadius="md" w="100%">
      <HStack align="center" mb={2}>
        {titleIcon && (
          <Image src={titleIcon} boxSize="40px" objectFit="contain" />
        )}
        <Heading>{title}</Heading>
      </HStack>

      <VStack gap={3}>
        {isArray ? (
          <>
            {safeArray.map((item, idx) => (
              <HStack key={idx} w="100%">
                <Input
                  value={item}
                  bg="white"
                  onChange={(e) => handleChange(idx, e.target.value)}
                />
                <Tooltip
                  content={
                    safeArray.length <= minLength
                      ? `At least ${minLength} required`
                      : "Remove item"
                  }
                >
                  <Icon
                    as={IoIosRemoveCircle}
                    color="#BD4F23"
                    boxSize={6}
                    _hover={{ cursor: "pointer" }}
                    onClick={() => handleRemove(idx)}
                  />
                </Tooltip>
              </HStack>
            ))}
            <Button onClick={handleAdd} size="sm" alignSelf="end" bg={"#BD4F23"} >
              <Icon as={IoAddCircleSharp} />
              Add
            </Button>
          </>
        ) : (
          <Textarea
            bg="white"
            value={value as string}
            onChange={(e) => onChange(e.target.value as T)}
          />
        )}
      </VStack>
    </Box>
  );
};


export default EditableProfileInfoBox;
