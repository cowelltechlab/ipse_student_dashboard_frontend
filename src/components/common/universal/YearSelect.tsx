import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useMemo } from "react";
import useYears from "../../../hooks/years/useYears";

interface YearSelectProps {
  selectedYearId: number | null;
  setSelectedYearId: (yearId: number | null) => void;
}

const YearSelect = ({ selectedYearId, setSelectedYearId }: YearSelectProps) => {
  const { years } = useYears();

  const yearCollection = useMemo(
    () =>
      createListCollection({
        items: [
          { label: "None", value: "" }, // Optional placeholder item
          ...years.map((year) => ({
            label: year.name,
            value: String(year.id),
          })),
        ],
      }),
    [years]
  );

  return (
    <Select.Root
      collection={yearCollection}
      value={selectedYearId !== null ? [String(selectedYearId)] : []}
      onValueChange={(details) => {
        const selectedIdStr = details.value[0];
        if (!selectedIdStr) {
          setSelectedYearId(null);
          return;
        }

        const selectedId = Number(selectedIdStr);
        setSelectedYearId(selectedId);
      }}
    >
      <Select.HiddenSelect />

      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select year" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal disabled>
        <Select.Positioner>
          <Select.Content>
            {yearCollection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default YearSelect;
