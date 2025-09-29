import { Box, Separator, Flex, Button } from "@chakra-ui/react";
import CreateNewAssignmentIcon from "../assets/Create New Assignment.svg";
import PageHeader from "../components/common/pageHeader/PageHeader";
import HeaderCard from "../components/common/pageHeader/HeaderCard";
import UploadAssignmentBox from "../components/createNewAssignment/UploadAssignmentBox";
import RawTextInputBox from "../components/createNewAssignment/RawTextInputBox";
import InputModeToggle from "../components/createNewAssignment/InputModeToggle";
import DocumentForm from "../components/createNewAssignment/DocumentForm";
import SelectStudentsSection from "../components/createNewAssignment/SelectStudentsSection";
import SubmitForm from "../components/createNewAssignment/SubmitForm";
import { useState } from "react";
import ClassSelectionDialog from "../components/common/classDropdown/ClassSelectionDialog";
import SubmitModal from "../components/createNewAssignment/SubmitModal";

const CreateNewAssignment = () => {
  const cardText = `Create an assignment that adapts and grows to support every
                     student's needs. Let's make learning accessible for all!`;

  const [studentIds, setStudentIds] = useState<Set<number>>(new Set<number>());
  const [allStudentIds, setAllStudentIds] = useState<number[]>([]);
  const [title, setTitle] = useState<string>("");
  const [classId, setClassId] = useState<number | null>(null);
  const [classRefetch, setClassRefetch] = useState<number>(0);
  const [addClassModalOpen, setAddClassModalOpen] = useState<boolean>(false);
  const [assignmentTypeId, setAssignmentTypeId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [inputMode, setInputMode] = useState<'file' | 'text'>('file');
  const [textContent, setTextContent] = useState<string>("");

  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  const handleModeChange = () => {
    if (inputMode === 'file') {
      setFile(null);
    } else {
      setTextContent("");
    }
  };

  return (
    <Box>
      <PageHeader />
      <Box>
        <HeaderCard
          cardHeading="Create Assignment"
          cardText={cardText}
          cardImageUrl={CreateNewAssignmentIcon}
        />
      </Box>

      <Separator variant="solid" mx={6} />

      <Box p={6}>
        <InputModeToggle
          inputMode={inputMode}
          setInputMode={setInputMode}
          onModeChange={handleModeChange}
        />

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={8}
          mx="auto"
        >
          {inputMode === 'file' ? (
            <UploadAssignmentBox file={file} setFile={setFile} />
          ) : (
            <RawTextInputBox textContent={textContent} setTextContent={setTextContent} />
          )}

          <DocumentForm
            title={title}
            setTitle={setTitle}
            assignmentTypeId={assignmentTypeId}
            setAssignmentTypeId={setAssignmentTypeId}
            classId={classId}
            setClassId={setClassId}
            classRefetch={classRefetch}
            setAddClassModalOpen={setAddClassModalOpen}
          />
        </Flex>
      </Box>

      <Flex justify="flex-end" px={6} mt={2}>
        <Button
          size="sm"
          bgColor={"#BD4F23"}
          onClick={() => setStudentIds(new Set(allStudentIds))}
        >
          Select All Students
        </Button>
      </Flex>

      <Flex p={6}>
        <SelectStudentsSection
          selectedStudentIds={studentIds}
          setSelectedStudentIds={setStudentIds}
          onStudentsLoaded={setAllStudentIds}
        />
      </Flex>
      

      <Flex>
        <SubmitForm
          studentIds={studentIds}
          title={title}
          classId={classId}
          file={file}
          textContent={textContent}
          inputMode={inputMode}
          assignmentTypeId={assignmentTypeId}
          openSuccessDialog={() => setOpenSuccessDialog(true)}
        />
      </Flex>

      {addClassModalOpen && (
        <ClassSelectionDialog
          open={addClassModalOpen}
          setOpen={setAddClassModalOpen}
          triggerRefetch={() => setClassRefetch(classRefetch + 1)}
        />
      )}

      <SubmitModal
        isOpen={openSuccessDialog}
        setIsOpen={setOpenSuccessDialog}
      />
    </Box>
  );
};

export default CreateNewAssignment;
