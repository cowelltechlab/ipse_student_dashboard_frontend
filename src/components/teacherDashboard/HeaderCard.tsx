import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../../contexts/useAuth";

const HeaderCard = () => {
  const { firstName, lastName } = useAuth();

  return (
    <Box m={5} bg={"#244d8a"} p={4} borderRadius={"md"} boxShadow={"lg"}>
      <Heading color={"white"} fontSize={"2xl"} p={4}>
        Hello {firstName} {lastName}
      </Heading>
      <Text color={"white"} fontSize={"lg"} p={4}>
        Let's make space for every story, celebrate every voice, and build a
        world where everyone belongs.
      </Text>
      {/* <Image>
        <img
          src=""
          alt="An illustration of a teacher with a student"
          style={{ width: "100%", height: "auto" }}
        />
      </Image> */}
    </Box>
  );
};

export default HeaderCard;
