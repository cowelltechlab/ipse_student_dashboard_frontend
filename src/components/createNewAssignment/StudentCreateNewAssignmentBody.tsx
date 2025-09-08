import { Box, Flex, Separator } from "@chakra-ui/react";
import HeaderCard from "../common/pageHeader/HeaderCard";

import CreateNewAssignmentIcon from "../../assets/Create New Assignment.svg";
import { useState } from "react";
import SubmitForm from "./SubmitForm";
import { useParams } from "react-router-dom";
import UploadAssignmentBox from "./UploadAssignmentBox";
import DocumentForm from "./DocumentForm";
import ClassSelectionDialog from "../common/classDropdown/ClassSelectionDialog";
import SubmitModal from "./SubmitModal";
import useStudent from "../../hooks/students/useStudent";
import StudentSummaryHeaderCard from "../common/studentProfilePages/StudentSummaryHeaderCard";

const StudentCreateNewAssignmentBody = () => {
  const { student_id } = useParams<{ student_id: string }>();

  const cardText = `Create an assignment that adapts and grows to support every
                         student's needs. Let's make learning accessible for all!`;

  const [title, setTitle] = useState<string>("");
  const [classId, setClassId] = useState<number | null>(null);
  const [classRefetch, setClassRefetch] = useState<number>(0);
  const [addClassModalOpen, setAddClassModalOpen] = useState<boolean>(false);
  const [assignmentTypeId, setAssignmentTypeId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  const { student, loading: profileLoading } = useStudent(student_id);

  return (
    <Box>
      <StudentSummaryHeaderCard
        student={student}
        profileLoading={profileLoading}
      />

      <HeaderCard
        cardHeading="Create Assignment"
        cardText={cardText}
        cardImageUrl={CreateNewAssignmentIcon}
      />

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
          studentId={student_id ? Number(student_id) : null}
        />
      </Flex>

      <Flex>
        <SubmitForm
          studentIds={student_id ? new Set([Number(student_id)]) : new Set()}
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

      <SubmitModal
        isOpen={openSuccessDialog}
        setIsOpen={setOpenSuccessDialog}
      />
    </Box>
  );
};

export default StudentCreateNewAssignmentBody;
