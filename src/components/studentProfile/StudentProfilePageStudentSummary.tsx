import {
  Skeleton,
  Stack,
  Image,
  VStack,
  Heading,
  HStack,
  Icon,
  Box,
} from "@chakra-ui/react";
import type { StudentProfileType } from "../../types/StudentTypes";

import defaultProfileImage from "../../assets/default_profile_picture.jpg";
import { FaEdit } from "react-icons/fa";

interface StudentProfilePageStudentSummaryProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
}

const StudentProfilePageStudentSummary = ({
  student,
  profileLoading,
}: StudentProfilePageStudentSummaryProps) => {
  return (
    <Stack direction={{ base: "column", md: "row" }} mt={6} align={"end"}>
      <Skeleton loading={profileLoading} borderRadius="md">
        <Image
          src={student?.profile_picture_url || defaultProfileImage}
          alt="Student Image"
          borderRadius="md"
          boxSize="150px"
          objectFit="cover"
        />
      </Skeleton>

      <VStack align={"start"}>
        <Skeleton
          loading={profileLoading}
          borderRadius="xl"
          width="200px"
          height="40px"
        >
          <Box>
            <Heading size={"2xl"}>
              {student?.first_name} {student?.last_name}
            </Heading>
          </Box>
        </Skeleton>

        <HStack>
          <Skeleton loading={profileLoading} borderRadius="xl" minW="150px">
            <HStack bg="#244d8a" color="white" px={3} py={1} borderRadius="xl">
              <Box>
                Year <b>{student?.year_name}</b>
              </Box>
              <Icon as={FaEdit} />
            </HStack>
          </Skeleton>

          <Skeleton loading={profileLoading} borderRadius="xl" minW="200px">
            <HStack bg="#244d8a" color="white" px={3} py={1} borderRadius="xl">
              <Box>
                Classes{" "}
                <b>{student?.classes.map((c) => c.class_name).join(", ")}</b>
              </Box>
              <Icon as={FaEdit} />
            </HStack>
          </Skeleton>
        </HStack>
      </VStack>
    </Stack>
  );
};

export default StudentProfilePageStudentSummary;
