import {
  HStack,
  Spacer,
  Image,
  Box,
} from "@chakra-ui/react";

import CreateNewDropdown from "./CreateNewDropdown";
import TextButton from "../universal/TextButton";

import myChoiceText from "../../../assets/myChoice.png";
import { useNavigate } from "react-router-dom";
import LogoutMenu from "./LogoutMenu";

const PageHeader = () => {
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate("/dashboard");
  };

  return (
    <Box>
      <HStack p={{ base: 2, md: 4 }} gap={{ base: 2, md: 4 }}>
        {/* Logo Section */}
        <HStack
          gap={{ base: 0.5, md: 1 }}
          onClick={onHomeClick}
          cursor="pointer"
          flexShrink={0}
        >
          <Image
            src={myChoiceText}
            alt="MyChoice"
            maxW={{ base: "90px", sm: "120px", md: "200px" }}
            h="auto"
          />
          <Image
            src="/app_icon.svg"
            alt="MyChoice"
            boxSize={{ base: "40px", sm: "50px", md: "65px" }}
          />
        </HStack>

        <Spacer />

        {/* Menu Section */}
        <HStack gap={{ base: 1, sm: 2, md: 4 }} flexShrink={0}>
          {/* Hide Home button on very small screens */}
          <Box display={{ base: "none", sm: "block" }}>
            <TextButton fontSize="md" onClick={onHomeClick}>
              Home
            </TextButton>
          </Box>
          <CreateNewDropdown />
          <LogoutMenu />
        </HStack>
      </HStack>

    </Box>
  );
};

export default PageHeader;
