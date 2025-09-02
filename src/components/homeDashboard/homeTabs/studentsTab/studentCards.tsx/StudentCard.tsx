import {
  Card,
  Avatar,
  Stack,
  Text,
  VStack,
  Box,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";

const MotionCard = motion.create(chakra(Card.Root));

import profileDefaultIcon from "../../../../../assets/profile_default.png";

interface StudentCardProps {
  firstName: string;
  lastName: string;
  classYear: string | null;
  schoolEmail?: string;
  profilePictureUrl?: string;
  profile_tag?: string | null;
  onClick?: () => void;
}

const StudentCard = ({
  firstName,
  lastName,
  classYear,
  schoolEmail = "",
  profilePictureUrl,
  profile_tag,
  onClick,
}: StudentCardProps) => {
  return (
    <MotionCard
      width="320px"
      h="175px"
      onClick={onClick}
      cursor="pointer"
      boxShadow="md"
      bg="#EAEEF4"
      rounded="lg"
      style={{ transformOrigin: "center" }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.995, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 24 }}
      _hover={{ boxShadow: "lg" }}
    >
      <Card.Root
        width="320px"
        h={"175px"}
        onClick={onClick}
        cursor="pointer"
        boxShadow={"md"}
        bg={"white"}
      >
        <Card.Body justifyContent={"center"}>
          <VStack my="5" gap={6}>
            <HStack gap={6}>
              <Avatar.Root shape={"rounded"} size={"xl"}>
                <Avatar.Image
                  src={
                    profilePictureUrl ? profilePictureUrl : profileDefaultIcon
                  }
                  alt={`${firstName} ${lastName}`}
                />
              </Avatar.Root>
              <Stack gap="0" align="center">
               {firstName ? (
                 <Text fontWeight="semibold" textStyle="md" color={"#BD4F23"}>
                   {firstName} {lastName}
                 </Text>
               ) : <Text fontWeight="semibold" textStyle="md" color={"#BD4F23"}>
                   {schoolEmail}
                </Text>}
                <Text color="fg.muted" textStyle="md">
                  {classYear}
                </Text>
              </Stack>
            </HStack>
           
            {profile_tag && (
              <Box
                bg="#244D8A"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="sm"
                display="flex"
                alignItems="center"
                gap="1"
              >
                <Text fontWeight="medium" fontSize="sm">
                  {profile_tag}
                </Text>
              </Box>
            )}
          </VStack>
        </Card.Body>
      </Card.Root>
    </MotionCard>
  );
};

export default StudentCard;
