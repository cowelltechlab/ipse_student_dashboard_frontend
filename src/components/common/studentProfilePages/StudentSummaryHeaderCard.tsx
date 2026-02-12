import {
  Skeleton,
  Stack,
  Image,
  VStack,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import type { StudentProfileType } from "../../../types/StudentTypes";
import StudentNameSwitcher from "./StudentNameSwitcher";

import defaultProfileImage from "../../../assets/default_profile_picture.jpg";

interface StudentSummaryHeaderCardProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
}

const StudentSummaryHeaderCard = ({
  student,
  profileLoading,
}: StudentSummaryHeaderCardProps) => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      mt={6}
      m={3}
      p={6}
      borderRadius="lg"
      color="white"
      align="stretch"
    >
      <Skeleton loading={profileLoading} borderRadius="md">
        <Box
          alignSelf={{ base: "center", md: "flex-start" }}
          mb={{ base: 4, md: 0 }}
        >
          <Image
            src={student?.profile_picture_url || defaultProfileImage}
            alt="Student Image"
            borderRadius="md"
            boxSize={{ base: "130px", sm: "150px", md: "165px" }}
            objectFit="cover"
          />
        </Box>
      </Skeleton>

      <VStack align="start" w="100%" bg={"#244D8A"} p={6} borderRadius={"md"}>
        <Skeleton
          loading={profileLoading}
          borderRadius="xl"
          w="100%"
          minW="280px"
          h="40px"
          mb={4}
        >
          <Box w="100%" minW="280px">
            <StudentNameSwitcher
              student={student}
              profileLoading={profileLoading}
              variant="header"
            />
          </Box>
        </Skeleton>

        <HStack align={"center"} mb={4}>
          {!profileLoading && (
            <Text>"{student?.profile_summaries.vision}"</Text>
          )}
        </HStack>

        <HStack
          flexWrap={{ base: "wrap", md: "nowrap" }}
          align="start"
          w="100%"
        >
          <Skeleton
            loading={profileLoading}
            borderRadius="xl"
            w={{ base: "100%", sm: "auto" }}
          >
            <HStack
              bg="gray.200"
              color="black"
              px={3}
              py={1}
              borderRadius="xl"
              w="100%"
              shadow={"xl"}
            >
              <Box>
                <b>Year:</b> <b>{student?.year_name}</b>
              </Box>
              {/* <Icon as={FaEdit} /> */}
            </HStack>
          </Skeleton>

          <Skeleton
            loading={profileLoading}
            borderRadius="xl"
            w={{ base: "100%", sm: "auto" }}
          >
            <HStack
              bg="gray.200"
              color="black"
              px={3}
              py={1}
              borderRadius="xl"
              w="100%"
            >
              <Box>
                <b>Classes:</b>{" "}
                <b>{student?.classes.map((c) => c.class_name).join(", ")}</b>
              </Box>
              {/* <Icon as={FaEdit} /> */}
            </HStack>
          </Skeleton>
        </HStack>
      </VStack>
    </Stack>
  );
};

export default StudentSummaryHeaderCard;
