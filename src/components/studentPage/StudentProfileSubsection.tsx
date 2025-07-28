import {
  HStack,
  VStack,
  Icon,
  Heading,
  Text,
  Spacer,
  Image,
  Separator,
} from "@chakra-ui/react";
import type { StudentProfileSectionSelection } from "./StudentPageContent";
import { IoIosArrowDroprightCircle } from "react-icons/io";

interface StudentProfileSubsectionProps {
  section: StudentProfileSectionSelection;
}

const StudentProfileSubsection = ({
  section,
}: StudentProfileSubsectionProps) => {
  return (
    <VStack
      onClick={section.onClick}
      w="100%"
      align="start"
      spaceY={4}
      p={4}
      _hover={{ bg: "gray.50", cursor: "pointer" }}
    >
      <HStack w="100%" align="center">
        <Image src={section.icon} boxSize="50px" objectFit="contain" />

        <VStack align="start" >
          <Heading size="md">{section.headingName}</Heading>
          <Text fontSize="sm" color="gray.600">
            {section.subheading}
          </Text>
        </VStack>

        <Spacer />

        <Icon as={IoIosArrowDroprightCircle} color="#BD4F23" boxSize={6} />
      </HStack>

      <Separator />
    </VStack>
  );
};

export default StudentProfileSubsection;
