import {
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import useRoles from "../../hooks/roles/useRoles";

const CreateUserDialog = () => {
  const { roles } = useRoles();
  const [newUserRoleIds, setNewUserRoleIds] = useState<string[]>([]);

  const roleCollection = useMemo(() => 
    createListCollection({
      items: roles.map(r => ({ label: r.role_name, value: r.id })),
    }), [roles]
  );

  return (
    <Select.Root
      collection={roleCollection} 
      value={newUserRoleIds}
      onValueChange={(details) => setNewUserRoleIds(details.value)}
    >
      <Select.HiddenSelect />
      <Select.Label>New User Role</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select role(s)" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {roleCollection.items.map(item => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default CreateUserDialog;