import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

interface HeaderCardProps {
  cardHeading: string;
  cardText: string;
  cardImageUrl: string;
  bg?: string;
  color?: string;
}

const HeaderCard = ({
  cardHeading,
  cardText,
  cardImageUrl,
  bg = "#244d8a",
  color = "white",
}: HeaderCardProps) => {
  const imageSize = useBreakpointValue({
    base: "200px",
    md: "180px",
    lg: "240px",
  });

  const containerHeight = useBreakpointValue({
    base: "360px",
    md: "180px",
  });

  return (
    <Box
      mx={5}
      position="relative"
      height={containerHeight}
      borderRadius="md"
      overflow="hidden"
    >
      {/* Blue Background Box */}
      <Box position="absolute" inset={0} bg={bg} zIndex={0} />

      {/* Foreground Content */}
      <Box
        position="relative"
        zIndex={1}
        h="100%"
        px={6}
        display="flex"
        alignItems="center"
      >
        <Flex
          w="100%"
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-end", md: "center" }}
          justify="space-between"
        >
          <Box flex="1" pr={{ md: 4 }}>
            <Heading color={color} fontSize="2xl" mb={2}>
              {cardHeading}
            </Heading>
            <Text color={color} fontSize="md">
              {cardText}
            </Text>
          </Box>
          <Image
            src={cardImageUrl}
            alt="An illustration of a teacher with a student"
            width={imageSize}
            mt={{ base: 4, md: 0 }}
            flexShrink={0}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default HeaderCard;
