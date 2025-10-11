import { useNavigate } from "react-router-dom";
import useAuth from "../../../contexts/useAuth";
import { Avatar, AvatarGroup, Box, Menu, Portal } from "@chakra-ui/react";

import profileDefaultIcon from "../../../assets/default_profile_picture.jpg";

const LogoutMenu = () => {
  const { profilePictureUrl, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box>
      <Menu.Root>
        <Menu.Trigger asChild>
          <AvatarGroup>
            <Avatar.Root>
              <Avatar.Fallback />
              <Avatar.Image src={profilePictureUrl ?? profileDefaultIcon} />
            </Avatar.Root>
          </AvatarGroup>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                value="profile"
                onClick={() => navigate("/profile")}
                bg={"#244D8A"}
                color={"white"}
                _hover={{ bg: "#1a3a6b" }}
                borderRadius={"md"}
                mb={2}
              >
                My Profile
              </Menu.Item>
              <Menu.Item value="logout" onClick={() => logout(navigate)} bg={"#BD4F23"} color={"white"} _hover={{ bg: "#A63E1B" }} borderRadius={"md"}>
                Logout
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  );
};

export default LogoutMenu;
