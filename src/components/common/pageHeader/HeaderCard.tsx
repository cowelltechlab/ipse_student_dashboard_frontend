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
  
}

const HeaderCard = ({ cardHeading, cardText, cardImageUrl }: HeaderCardProps) => {
  const imageSize = useBreakpointValue({
    base: "200px",
    md: "180px",
    lg: "240px",
  });

  return (
    <Box mx={5} position="relative" minHeight="200px">
      {/* Decorative Blue Background Box */}
      <Box
        bg="#244d8a"
        height={{ base: "315px", md: "150px" }}
        w="100%"
        position="absolute"
        top="50%"
        left={0}
        transform="translateY(-50%)"
        zIndex={0}
        borderRadius="md"
      />

      {/* Main White Content Card */}
      <Box position="relative" bg="none" px={6} borderRadius="md" zIndex={1}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-end", md: "center" }}
          justify="space-between"
        >
          <Box flex="1" pr={{ md: 4 }}>
            <Heading color="white" fontSize="2xl" mb={2}>
                {cardHeading}
            </Heading>
            <Text color="white" fontSize="md">
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
