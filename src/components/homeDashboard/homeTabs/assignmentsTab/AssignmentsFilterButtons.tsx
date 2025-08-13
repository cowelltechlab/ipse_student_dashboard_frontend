import { Button, ButtonGroup, Portal, Popover } from "@chakra-ui/react";
import CustomDatePicker from "../../../common/universal/DatePicker";
import { useState } from "react";

interface AssignmentsFilterButtonsProps {
  dateRange: { from: Date | undefined; to?: Date | undefined };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ from: Date | undefined; to?: Date | undefined }>
  >;
  setFilterByNeedsRating: (filter: boolean) => void;
  setFilterByNotFinalized: (filter: boolean) => void;
}

const AssignmentsFilterButtons = ({
  dateRange,
  setDateRange,
  setFilterByNeedsRating,
  setFilterByNotFinalized,
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
          setFilterByNotFinalized(false);
          setFilterByNeedsRating(false);
        }}
      >
        All Assignments
      </Button>

      <Button
        
        {...getButtonStyles("needsRating")}
        onClick={() => {
          setActiveButton("needsRating");
          setDateRange({ from: undefined, to: undefined });
          setFilterByNotFinalized(false);
          setFilterByNeedsRating(true);
        }}
      >
        Needs Rating
      </Button>

      <Button
        {...getButtonStyles("notFinalized")}
        onClick={() => {
          setActiveButton("notFinalized");
          setDateRange({ from: undefined, to: undefined });
          setFilterByNotFinalized(true);
        }}
      >
        Not Finalized
      </Button>

      <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Popover.Trigger asChild>
          <Button
            {...getButtonStyles("dateFilter")}
            onClick={() => {
              setActiveButton("dateFilter");
              setFilterByNeedsRating(false);
              setFilterByNotFinalized(false);
            }}
          >
            Filter By Modified Date
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

export default AssignmentsFilterButtons;
