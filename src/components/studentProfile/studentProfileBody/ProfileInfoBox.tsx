import {
  Box,
  Heading,
  List,
  Skeleton,
  SkeletonText,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";
import { type ReactNode } from "react";

interface ProfileInfoBoxProps {
  title: string;
  titleIcon?: string;
  content?: string | string[];
  children?: ReactNode;
  loading?: boolean;
}

const ProfileInfoBox = ({
  title,
  titleIcon,
  content,
  children,
  loading = false,
}: ProfileInfoBoxProps) => {
  const isArray = Array.isArray(content);

  return (
    <Box bg="#eaeef4" p={4} borderRadius="md" w="100%" >
        <HStack align={"center"} mb={2}>
          {titleIcon && (
            <Image src={titleIcon} boxSize="40px" objectFit="contain" />
          )}
          <Heading>{title}</Heading>
        </HStack>

      {children ? (
        <Skeleton loading={loading}>{children}</Skeleton>
      ) : loading ? (
        <SkeletonText noOfLines={isArray ? 3 : 2} spaceX="3" mt="2" />
      ) : isArray ? (
        <List.Root pt={2}>
          {(content as string[]).map((item, index) => (
            <List.Item key={index} ml={6}>
              {item}
            </List.Item>
          ))}
        </List.Root>
      ) : (
        <Text pt={2}>{content}</Text>
      )}
    </Box>
  );
};

export default ProfileInfoBox;
