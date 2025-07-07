import { Box, Flex, Spinner } from "@chakra-ui/react";
import useDefaultProfilePictures from "../../hooks/users/useDefaultProfilePictures";

interface DefaultProfilePictureGridProps {
  selectedPicture: string | null;
  onSelectPicture: (picture: string) => void;
}

const DefaultProfilePictureGrid = ({
  selectedPicture,
  onSelectPicture,
}: DefaultProfilePictureGridProps) => {
  const { defaultProfilePictures, loading, error } =
    useDefaultProfilePictures();

  return (
    <Flex justifyContent="center" alignItems="center">
      {loading && (
        <Box>
          <Spinner />
        </Box>
      )}
      {error && <Box color={"white"}>Error loading profile pictures</Box>}
      {!loading && !error && (
        <Flex wrap="wrap" gap={4}>
          {defaultProfilePictures.map((picture) => (
            <Box
              key={picture.id}
              width="100px"
              height="100px"
              backgroundImage={`url(${picture.url})`}
              backgroundSize="cover"
              backgroundPosition="center"
              borderRadius="md"
              cursor="pointer"
              onClick={() => onSelectPicture(picture.url)}
              boxShadow={
                picture.url === selectedPicture
                  ? "0 0 0 4px white, 0 0 8px 4px #3182ce"
                  : "none"
              }
              border={
                picture.url === selectedPicture
                  ? "2px solid #3182ce"
                  : "2px solid transparent"
              }
              transition="all 0.2s ease-in-out"
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default DefaultProfilePictureGrid;
