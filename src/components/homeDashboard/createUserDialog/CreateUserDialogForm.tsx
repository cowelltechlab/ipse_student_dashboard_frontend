import {
  createListCollection,
  Input,
  Portal,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react";
import type { RoleType } from "../../../types/RoleTypes";
import { useMemo } from "react";

interface CreateUserDialogFormProps {
  newUserGoogleEmail: string;
  setNewUserGoogleEmail: (email: string) => void;
  newUserGTEmail: string;
  setNewUserGTEmail: (email: string) => void;
  newUserRoleIds: string[];
  setNewUserRoleIds: (roleIds: string[]) => void;
  roles: RoleType[];
}

const CreateUserDialogForm = ({
  newUserGoogleEmail,
  setNewUserGoogleEmail,
  newUserGTEmail,
  setNewUserGTEmail,
  newUserRoleIds,
  setNewUserRoleIds,
  roles,
}: CreateUserDialogFormProps) => {
  const roleCollection = useMemo(
    () =>
      createListCollection({
        items: roles.map((r) => ({ label: r.role_name, value: r.id })),
      }),
    [roles]
  );

  return (
    <form>
      <VStack justifyContent="space-between" spaceY={2}>
        
        <Input
          placeholder="New User Google Email"
          _placeholder={{ color: "white" }}
          color="white"
          value={newUserGoogleEmail}
          onChange={(e) => setNewUserGoogleEmail(e.target.value)}
          variant="flushed"
          size={"xl"}
          w="full"
        />

        <Input
          placeholder="New User GT Email"
          _placeholder={{ color: "white" }}
          color="white"
          value={newUserGTEmail}
          onChange={(e) => setNewUserGTEmail(e.target.value)}
          variant="flushed"
          size={"xl"}
          w="full"
        />

        <Select.Root
          collection={roleCollection}
          value={newUserRoleIds}
          onValueChange={(details) => setNewUserRoleIds(details.value)}
        >
          <Select.HiddenSelect />
          <Select.Label mt={2} mb={1}>
            <Text color={"white"} fontSize={"md"}>
              New User Role
            </Text>
          </Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select role(s)" color="white" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal disabled>
            <Select.Positioner>
              <Select.Content color={"white"} bg="#244D8A">
                {roleCollection.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </VStack>
    </form>
  );
};

export default CreateUserDialogForm;
