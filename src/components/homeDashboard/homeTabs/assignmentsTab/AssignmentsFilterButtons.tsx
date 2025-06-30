import { Button, ButtonGroup, Portal, Popover } from "@chakra-ui/react";
import CustomDatePicker from "../../../common/universal/DatePicker";
import { useState } from "react";

interface AssignmentsFilterButtonsProps {
  dateRange: { from: Date | undefined; to?: Date | undefined };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ from: Date | undefined; to?: Date | undefined }>
  >;
}

const AssignmetsFilterButtons = ({
  dateRange,
  setDateRange,
}: AssignmentsFilterButtonsProps) => {
  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("allAssignments");

  const getButtonStyles = (name: string) => ({
    borderRadius: "2xl",
    borderWidth: "1px",
    borderColor: "gray.300",
    bg: activeButton === name ? "#f2c5b5" : "white",
    color: "black",
    _hover: {
      bg: "#edb29e",
    },
  });

  return (
    <ButtonGroup>
      <Button
        {...getButtonStyles("allAssignments")}
        onClick={() => {
          setActiveButton("allAssignments");
          setDateRange({ from: undefined, to: undefined });
        }}
      >
        All Assignments
      </Button>

      <Button
        {...getButtonStyles("needsRating")}
        onClick={() => {
          setActiveButton("needsRating");
          setDateRange({ from: undefined, to: undefined });
        }}
      >
        Needs Rating
      </Button>

      <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Popover.Trigger asChild>
          <Button
            {...getButtonStyles("dateFilter")}
            onClick={() => {
              setActiveButton("dateFilter");
            }}
          >
            Filter By Date
          </Button>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content
              boxShadow="lg"
              bg="white"
              borderRadius="md"
              zIndex={20}
            >
              <Popover.Arrow />
              <Popover.Body>
                <CustomDatePicker
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </ButtonGroup>
  );
};

export default AssignmetsFilterButtons;
