import {
  createListCollection,
  Input,
  Portal,
  Select,
  VStack,
  Text,
  HStack,
  Button,
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
  studentType: "A" | "B";
  setStudentType: (type: "A" | "B") => void;
}

const CreateUserDialogForm = ({
  newUserGoogleEmail,
  setNewUserGoogleEmail,
  newUserGTEmail,
  setNewUserGTEmail,
  newUserRoleIds,
  setNewUserRoleIds,
  roles,
  studentType,
  setStudentType,
}: CreateUserDialogFormProps) => {
  const roleCollection = useMemo(
    () =>
      createListCollection({
        items: roles.map((r) => ({ label: r.role_name, value: String(r.id) })),
      }),
    [roles]
  );

  const hasStudentSelected = useMemo(
    () =>
      roles.some(
        (r) =>
          newUserRoleIds.includes(String(r.id)) && r.role_name === "Student"
      ),
    [roles, newUserRoleIds]
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
              <Select.Content color={"black"} bg="white">
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

        {hasStudentSelected && (
          <>
            <Text color="white" fontSize="md">
              What type of student is this?
            </Text>
            <HStack bg="white" p="1" borderRadius="full" gap={0} w="100%">
              <Button
                flex="1"
                size="sm"
                variant="ghost"
                color={studentType != "A" ? "black" : "white"}
                bg={studentType === "A" ? "#bd4f23" : "transparent"}
                _hover={{ bg: studentType === "A" ? "#bd4f23" : "#ff9a6c" }}
                borderLeftRadius="full"
                borderRightRadius={0}
                onClick={() => setStudentType("A")}
              >
                A
              </Button>
              <Button
                flex="1"
                size="sm"
                variant="ghost"
                color={studentType != "B" ? "black" : "white"}
                bg={studentType === "B" ? "#bd4f23" : "transparent"}
                _hover={{ bg: studentType === "B" ? "#bd4f23" : "#ff9a6c" }}
                borderRightRadius="full"
                borderLeftRadius={0}
                onClick={() => setStudentType("B")}
              >
                B
              </Button>
            </HStack>
          </>
        )}
      </VStack>
    </form>
  );
};

export default CreateUserDialogForm;
