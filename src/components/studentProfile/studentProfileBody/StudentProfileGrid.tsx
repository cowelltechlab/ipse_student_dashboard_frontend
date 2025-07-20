import {
  Box,
  Grid,
  GridItem,
  Heading,
  List,
} from "@chakra-ui/react";
import type { StudentProfileType } from "../../../types/StudentTypes";

interface StudentProfileGridProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
  triggerRefetch: () => void;
}

const StudentProfileGrid = ({
  student,
  profileLoading,
  triggerRefetch,
}: StudentProfileGridProps) => {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      templateRows="auto repeat(3, 1fr)"
      gap={4}
      mt={6}
    >
      {/* Full‑width box */}
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Box bg={"#eaeef4"} p={4} borderRadius="md">
          <Heading>Classes & Learning Goals</Heading>
          {/* <Text>{student?.classes</Text> */}
        </Box>
      </GridItem>

      {/* Left column */}
      <GridItem>
        <Box bg="#eaeef4" p={4} borderRadius="md">
          <Heading>What I am good at</Heading>
          <List.Root pt={2}>
            {student?.strengths.map((strength, index) => (
              <List.Item key={index} ml={6}>{strength}</List.Item>
            ))}
          </List.Root>
        </Box>
      </GridItem>

      <GridItem>
        <Box bg={"#eaeef4"} p={4} borderRadius="md">
          <Heading>Things that are hard for me</Heading>
        </Box>
      </GridItem>
      <GridItem>
        <Box bg={"#eaeef4"} p={4} borderRadius="md">
          <Heading>After college I want to</Heading>
        </Box>
      </GridItem>

      {/* Right column */}
      <GridItem>
        <Box bg={"#eaeef4"} p={4} borderRadius="md">
          <Heading>Currently I want to</Heading>
        </Box>
      </GridItem>
      <GridItem>
        <Box bg={"#eaeef4"} p={4} borderRadius="md">
          <Heading>Best way to assist me</Heading>
        </Box>
      </GridItem>
      <GridItem>
        <Box bg={"#eaeef4"} p={4} borderRadius="md">
          <Heading>Things I enjoy doing for fun</Heading>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default StudentProfileGrid;
