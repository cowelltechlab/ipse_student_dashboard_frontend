import { Box, Button, Heading, Icon, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { FaExclamationTriangle } from "react-icons/fa";

interface DownloadCardProps {
  title: string;
  description: string;
  icon: IconType;
  onDownload: () => void;
  loading?: boolean;
  disabled?: boolean;
  buttonText?: string;
  accentColor?: string;
  warningMessage?: string;
}

const DownloadCard = ({
  title,
  description,
  icon,
  onDownload,
  loading = false,
  disabled = false,
  buttonText = "Download",
  accentColor,
  warningMessage,
}: DownloadCardProps) => {
  const iconColor = accentColor || "#BD4F23";
  const buttonBgColor = accentColor || "#BD4F23";
  const buttonHoverColor = accentColor ? accentColor.replace(/[^#]*$/, (m) =>
    Math.max(0, parseInt(m.slice(0, 2), 16) - 30).toString(16).padStart(2, '0') +
    Math.max(0, parseInt(m.slice(2, 4), 16) - 30).toString(16).padStart(2, '0') +
    Math.max(0, parseInt(m.slice(4, 6), 16) - 30).toString(16).padStart(2, '0')
  ) : "#A03E1C";

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
        <Icon as={icon} boxSize={8} color={iconColor} />
        <Heading size="md">{title}</Heading>
      </Box>

      <Text fontSize="sm" color="gray.700" flex="1">
        {description}
      </Text>

      {warningMessage && (
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          bg="orange.50"
          p={3}
          borderRadius="md"
          border="1px solid"
          borderColor="orange.200"
        >
          <Icon as={FaExclamationTriangle} color="orange.500" />
          <Text fontSize="xs" color="orange.700">
            {warningMessage}
          </Text>
        </Box>
      )}

      <Button
        onClick={onDownload}
        loading={loading}
        disabled={disabled}
        bg={buttonBgColor}
        color="white"
        w="100%"
        _hover={{
          bg: buttonHoverColor,
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
