import {
  createListCollection,
  Heading,
  Portal,
  Select,
} from "@chakra-ui/react";

interface YearSelectProps {
  selectLabel: string;
  value: string[];
  setValue: (selection: string[]) => void;
}

const YearSelect = ({ selectLabel, value, setValue }: YearSelectProps) => {
  return (
    <Select.Root
      collection={years}
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Label>
        <Heading fontSize={"md"}>{selectLabel}</Heading>
      </Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select framework" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {years.items.map((year) => (
              <Select.Item item={year} key={year.value}>
                {year.label}
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

const years = createListCollection({
  items: Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}${getOrdinalSuffix(i + 1)} Grade`,
    value: i + 1,
  })),
});

function getOrdinalSuffix(n: number) {
  if (n >= 11 && n <= 13) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
