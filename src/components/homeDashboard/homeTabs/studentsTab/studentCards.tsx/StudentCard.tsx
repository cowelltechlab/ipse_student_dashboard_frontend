import { Card, Avatar, Stack, Text, VStack, Box } from "@chakra-ui/react";

import profileDefaultIcon from "../../../../../assets/profile_default.png";

interface StudentCardProps {
  firstName: string;
  lastName: string;
  classYear: string | null;
  profilePictureUrl?: string;
  profile_tag?: string | null
  onClick?: () => void;

}

const StudentCard = ({
  firstName,
  lastName,
  classYear,
  profilePictureUrl,
  profile_tag,
  onClick,
}: StudentCardProps) => {
  return (
    <Card.Root
      width="320px"
      onClick={onClick}
      cursor="pointer"
      boxShadow={"md"}
    >
      <Card.Body>
        <VStack my="3" gap="3">
          <Avatar.Root>
            <Avatar.Image
              src={profilePictureUrl ? profilePictureUrl : profileDefaultIcon}
              alt={`${firstName} ${lastName}`}
              width="40px"
              height="40px"
              borderRadius="full"
            />
          </Avatar.Root>
          <Stack gap="0" align="center">
            <Text fontWeight="semibold" textStyle="md">
              {firstName} {lastName}
            </Text>
            <Text color="fg.muted" textStyle="md">
              {classYear}
            </Text>

            {profile_tag && (
              <Box bg={"#fbde8e"} px={3} py={2} borderRadius="full">
                <Text color="black" textStyle="sm">
                  {profile_tag}
                </Text>
              </Box>
            )}
          </Stack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default StudentCard;
