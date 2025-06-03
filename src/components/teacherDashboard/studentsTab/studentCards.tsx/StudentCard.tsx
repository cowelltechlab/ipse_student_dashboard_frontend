import { Card, HStack, Avatar, Stack, Strong, Text } from "@chakra-ui/react";

import profileDefaultIcon from "../../../../assets/profile_default.png";

interface StudentCardProps {
  firstName: string;
  lastName: string;
  classYear: string;
  profilePictureUrl?: string;
  onClick?: () => void;
}

const StudentCard = ({
  firstName,
  lastName,
  classYear,
  profilePictureUrl,
  onClick,
}: StudentCardProps) => {
  return (
    <Card.Root width="320px" onClick={onClick} cursor="pointer">
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar.Root>
            <Avatar.Image
              src={profilePictureUrl ? profilePictureUrl : profileDefaultIcon}
              alt={`${firstName} ${lastName}`}
              width="40px"
              height="40px"
              borderRadius="full"
            />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {firstName} {lastName}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {classYear}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>
          <Strong color="fg">Nate Foss </Strong>
          has requested to join your team. You can approve or decline their
          request.
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default StudentCard;
