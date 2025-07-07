import {
  Card,
  Text,
  VStack,
} from "@chakra-ui/react";

interface StudentCardProps {
  firstName: string;
  lastName: string;
  classYear: string; 
  isSelected: boolean,
  onClick?: () => void;
}

const CreateAssignmentStudentCard = ({
  firstName,
  lastName,
  classYear,
  isSelected,
  onClick,
}: StudentCardProps) => {

  return (
    <Card.Root
      // width="120px"
      width="100%"
      onClick={onClick}
      cursor="pointer"
      // p={0}
      boxShadow={"md"}
      backgroundColor={isSelected? "#f2c5b5" : "none"}
      // boxShadow={isSelected ? selectedShadow : defaultShadow}
    >
      <Card.Body px={2} py={1}>
        <VStack my="3" gap="1">
          <Text fontWeight="semibold" textStyle="sm" textAlign="center">
            {firstName} {lastName}
          </Text>
          <Text color="fg.muted" textStyle="sm">
            {classYear}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default CreateAssignmentStudentCard;
