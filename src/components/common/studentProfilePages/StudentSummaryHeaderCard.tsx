import {
  Skeleton,
  Stack,
  Image,
  VStack,
  Heading,
  HStack,
  Box,
} from "@chakra-ui/react";
import type { StudentProfileType } from "../../../types/StudentTypes";

import defaultProfileImage from "../../../assets/default_profile_picture.jpg";
// import { FaEdit } from "react-icons/fa";

interface StudentSummaryHeaderCardProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
}

const StudentSummaryHeaderCard = ({
  student,
  profileLoading,
}: StudentSummaryHeaderCardProps) => {
  return (
    <Stack direction={{ base: "column", md: "row" }} mt={6} align={"end"}>
      <Skeleton loading={profileLoading} borderRadius="md">
        <Box
          alignSelf={{ base: "center", md: "flex-start" }}
          mb={{ base: 4, md: 0 }}
        >
          <Image
            src={student?.profile_picture_url || defaultProfileImage}
            alt="Student Image"
            borderRadius="md"
            boxSize={{ base: "120px", sm: "140px", md: "150px" }}
            objectFit="cover"
          />
        </Box>
      </Skeleton>

      <VStack align="start" w="100%">
        <Skeleton
          loading={profileLoading}
          borderRadius="xl"
          w={{ base: "100%", sm: "200px" }}
          h="40px"
        >
          <Box>
            <Heading size="2xl">
              {student?.first_name} {student?.last_name}
            </Heading>
          </Box>
        </Skeleton>

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
              bg="#244d8a"
              color="white"
              px={3}
              py={1}
              borderRadius="xl"
              w="100%"
            >
              <Box>
                Year <b>{student?.year_name}</b>
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
              bg="#244d8a"
              color="white"
              px={3}
              py={1}
              borderRadius="xl"
              w="100%"
            >
              <Box>
                Classes{" "}
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
