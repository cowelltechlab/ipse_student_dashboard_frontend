import { Box, Separator, Flex } from "@chakra-ui/react";
import CreateNewAssignmentIcon from "../assets/Create New Assignment.svg";
import PageHeader from "../components/common/pageHeader/PageHeader";
import HeaderCard from "../components/common/pageHeader/HeaderCard";
import UploadAssignmentBox from "../components/createNewAssignment/UploadAssignmentBox";
import DocumentForm from "../components/createNewAssignment/DocumentForm";
import SelectStudentsSection from "../components/createNewAssignment/SelectStudentsSection";
import SubmitForm from "../components/createNewAssignment/SubmitForm";
import { useState } from "react";
import ClassSelectionDialog from "../components/common/classDropdown/ClassSelectionDialog";

const CreateNewAssignment = () => {
  const cardText = `Create an assignment that adapts and grows to support every
                     student's needs. Let's make learning accessible for all!`;

  const [studentIds, setStudentIds] = useState<Set<number>>(new Set<number>());
  const [title, setTitle] = useState<string>("");
  const [classId, setClassId] = useState<number | null>(null);
  const [classRefetch, setClassRefetch] = useState<number>(0);
  const [addClassModalOpen, setAddClassModalOpen] = useState<boolean>(false);
  const [assignmentTypeId, setAssignmentTypeId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

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

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        gap={8}
        p={6}
        mx="auto"
      >
        <UploadAssignmentBox file={file} setFile={setFile} />
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
      <Flex p={6}>
        <SelectStudentsSection
          selectedStudentIds={studentIds}
          setSelectedStudentIds={setStudentIds}
        />
      </Flex>

      <Flex>
        <SubmitForm
          studentIds={studentIds}
          title={title}
          classId={classId}
          file={file}
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

      {/* {openSuccessDialog && (
        <SubmitModal />
      )} */}
    </Box>
  );
};

export default CreateNewAssignment;
