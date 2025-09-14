import {
  Button,
  CloseButton,
  Dialog,
  Image,
  Portal,
  VStack,
  Icon,
  Input,
  HStack,
  Select,
  RadioGroup,
  createListCollection,
  Heading,
  Separator,
  Field,
  Spacer,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import useCreateClass from "../../../hooks/classes/useCreateClass";
import { toaster } from "../../ui/toaster";

import addClassImage from "../../../assets/Student Profile_Document_No change summary.svg";

interface ClassSelectionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  triggerRefetch: () => void;
}

const ClassSelectionDialog = ({
  open,
  setOpen,
  triggerRefetch,
}: ClassSelectionDialogProps) => {
  const [submitHover, setSubmitHover] = useState<boolean>(false);

  const [courseCode, setCourseCode] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");

  const [term, setTerm] = useState<string>("Fall");
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [semester, setSemester] = useState<string>("");

  const [classType, setClassType] = useState<"IPSE" | "Inclusive">("Inclusive");

  const { handleCreateClass } = useCreateClass();

  useEffect(() => {
    setSemester(`${term} ${year}`);
  }, [term, year]);

  const handleClassCreateSubmit = async () => {
    try {
      await handleCreateClass(courseCode, courseName, semester, classType);

      toaster.create({
        description: `Class created successfully`,
        type: "success",
      });
      setOpen(false);
      triggerRefetch();
    } catch (e) {
      console.error(e);
      const error = e as {
        message: string;
        response?: { data: { message: string } };
      };

      const errorMessage = error.response?.data.message || error.message;
      toaster.create({
        description: `Error creating class: ${errorMessage}`,
        type: "error",
      });
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) =>
    (currentYear - i).toString()
  );

  const termCollection = createListCollection({
    items: ["Spring", "Summer", "Fall"].map((t) => ({ label: t, value: t })),
  });

  const yearCollection = createListCollection({
    items: yearOptions.map((yr) => ({ label: yr, value: yr })),
  });

  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
      size={"lg"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={5} bg="#eaeef4">
            <Dialog.Header>
              <Dialog.Title>Create a New Class</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack justifyContent="space-between">
                <Image src={addClassImage} />

                <Heading fontSize="md">Class Details</Heading>

                <Separator orientation="horizontal" mb={4} />

                <HStack w={"100%"}>
                  <Field.Root>
                    <Field.Label fontWeight={"bold"}>Course Code</Field.Label>
                    <Input
                      value={courseCode}
                      onChange={(e) => setCourseCode(e.target.value)}
                      placeholder="CHEM 1211"
                      bg={"white"}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label fontWeight={"bold"}>Course Name</Field.Label>
                    <Input
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="Principles of Chemistry I"
                      bg={"white"}
                    />
                  </Field.Root>
                </HStack>

                <Field.Root mt={4}>
                  <Field.Label fontWeight={"bold"}>Course Term</Field.Label>
                </Field.Root>

                <HStack w="100%">
                  {/* Term select */}
                  <Select.Root
                    bg={"white"}
                    collection={termCollection}
                    value={[term]}
                    onValueChange={(details) => {
                      const val = details.value;
                      if (Array.isArray(val)) {
                        setTerm(val[0]);
                      } else {
                        setTerm(val);
                      }
                    }}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select Term" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content>
                        {termCollection.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            <Select.ItemText>{item.label}</Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>

                  {/* Year select */}
                  <Select.Root
                    bg={"white"}
                    collection={yearCollection}
                    value={[year]}
                    onValueChange={(details) => {
                      const v = details.value;
                      setYear(Array.isArray(v) ? v[0] : v);
                    }}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select Year" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content>
                        {yearCollection.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            <Select.ItemText>{item.label}</Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                </HStack>

                <HStack mt={4} w={"80%"}>
                  <Field.Root >
                    <Field.Label fontWeight={"bold"}>Course Type?</Field.Label>
                  </Field.Root>

                  <Spacer />

                  <RadioGroup.Root
                  colorPalette={"orange"}
                    value={classType}
                    onValueChange={(e) => {
                      if (e.value === "IPSE" || e.value === "Inclusive") {
                        setClassType(e.value);
                      }
                    }}
                  >
                    <HStack gap="6">
                      {classTypeOptions.map((item) => (
                        <RadioGroup.Item key={item.value} value={item.value}>
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>
                            {item.label}
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                      ))}
                    </HStack>
                  </RadioGroup.Root>
                </HStack>
              </VStack>

              <VStack m={2} align="center" mt={6}>
                <Dialog.ActionTrigger asChild>
                  <Button bg={"#BD4F23"} w={"50%"}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  onClick={handleClassCreateSubmit}
                  variant="outline"
                  borderColor="#BD4F23"
                  color="#BD4F23"
                  w={"50%"}
                  _hover={{
                    bg: "#BD4F23",
                    borderColor: "#BD4F23",
                    color: "white",
                  }}
                  onMouseEnter={() => setSubmitHover(true)}
                  onMouseLeave={() => setSubmitHover(false)}
                >
                  Add Course
                  <Icon
                    as={FaCheckCircle}
                    ml={2}
                    color={submitHover ? "white" : "#BD4F23"}
                    _hover={{ color: "white" }}
                  />
                </Button>
              </VStack>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ClassSelectionDialog;

const classTypeOptions = [
  { label: "IPSE", value: "IPSE" },
  { label: "Inclusive", value: "Inclusive" },
];
