import { Box, Button, Heading, Icon, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface DownloadCardProps {
  title: string;
  description: string;
  icon: IconType;
  onDownload: () => void;
  loading?: boolean;
  disabled?: boolean;
  buttonText?: string;
}

const DownloadCard = ({
  title,
  description,
  icon,
  onDownload,
  loading = false,
  disabled = false,
  buttonText = "Download",
}: DownloadCardProps) => {
  return (
    <Box
      bg="#eaeef4"
      p={6}
      borderRadius="md"
      display="flex"
      flexDirection="column"
      gap={4}
      h="100%"
    >
      <Box display="flex" alignItems="center" gap={3}>
        <Icon as={icon} boxSize={8} color="#BD4F23" />
        <Heading size="md">{title}</Heading>
      </Box>

      <Text fontSize="sm" color="gray.700" flex="1">
        {description}
      </Text>

      <Button
        onClick={onDownload}
        loading={loading}
        disabled={disabled}
        bg="#BD4F23"
        color="white"
        w="100%"
        _hover={{
          bg: "#A03E1C",
        }}
        _disabled={{
          bg: "gray.400",
          cursor: "not-allowed",
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default DownloadCard;
