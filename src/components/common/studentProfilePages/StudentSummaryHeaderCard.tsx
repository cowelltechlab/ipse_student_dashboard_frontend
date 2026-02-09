import {
  Skeleton,
  Stack,
  Image,
  VStack,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import useStudents from "../../../hooks/students/useStudents";
import type { StudentProfileType } from "../../../types/StudentTypes";

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
          w={{ base: "100%", sm: "200px" }}
          h="40px"
        >
          <Box w="100%">
            { }
            <StudentNameSwitcher
              student={student}
              profileLoading={profileLoading}
            />
          </Box>
        </Skeleton>

        <HStack align={"center"}>
          {!profileLoading && (
            <Text>"{student?.profile_summaries.vision}"</Text>
          )}
        </HStack>

        <HStack
          flexWrap={{ base: "wrap", md: "nowrap" }}
          align="start"
          w="100%"
          mt={1}
        >
          <Skeleton
            loading={profileLoading}
            borderRadius="xl"
            w={{ base: "100%", sm: "auto" }}
          >
            <HStack
              bg="#BD4F23"
              color="white"
              px={3}
              py={1}
              borderRadius="xl"
              w="100%"
              shadow={"xl"}
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
              bg="#BD4F23"
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

const StudentNameSwitcher = ({
  student,
  profileLoading,
}: {
  student: StudentProfileType | null;
  profileLoading: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { students, loading: studentsLoading } = useStudents();

  const currentId = student ? String(student.student_id) : "";

  if (profileLoading || studentsLoading) {
    return null;
  }

  return (
    <div style={{ width: "100%" }}>
      <select
        aria-label="Select student"
        value={currentId}
        onChange={(e) => {
          const val = e.target.value;
          if (!val) return;
          const newPath = location.pathname.replace(/^\/student\/[^/]+/, `/student/${val}`);
          navigate(newPath);
        }}
        style={{
          minWidth: 280,
          maxWidth: "100%",
          background: "transparent",
          color: "white",
          border: "none",
          fontSize: 22,
          fontWeight: 700,
          display: "inline-block",
        }}
      >
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {`${s.first_name ?? ""} ${s.last_name ?? ""}`.trim()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StudentSummaryHeaderCard;
