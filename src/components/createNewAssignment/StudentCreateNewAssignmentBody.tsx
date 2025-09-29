import { Box, Flex, Separator } from "@chakra-ui/react";
import HeaderCard from "../common/pageHeader/HeaderCard";

import CreateNewAssignmentIcon from "../../assets/Create New Assignment.svg";
import { useState } from "react";
import SubmitForm from "./SubmitForm";
import { useParams } from "react-router-dom";
import UploadAssignmentBox from "./UploadAssignmentBox";
import RawTextInputBox from "./RawTextInputBox";
import InputModeToggle from "./InputModeToggle";
import DocumentForm from "./DocumentForm";
import ClassSelectionDialog from "../common/classDropdown/ClassSelectionDialog";
import StudentSubmitModal from "./StudentSubmitModal";
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
  const [inputMode, setInputMode] = useState<'file' | 'text'>('file');
  const [textContent, setTextContent] = useState<string>("");

  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [createdAssignmentId, setCreatedAssignmentId] = useState<number | null>(null);

  const { student, loading: profileLoading } = useStudent(student_id);

  const handleModeChange = () => {
    if (inputMode === 'file') {
      setFile(null);
    } else {
      setTextContent("");
    }
  };

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
            studentId={student_id ? Number(student_id) : null}
          />
        </Flex>
      </Box>

      <Flex>
        <SubmitForm
          studentIds={student_id ? new Set([Number(student_id)]) : new Set()}
          title={title}
          classId={classId}
          file={file}
          textContent={textContent}
          inputMode={inputMode}
          assignmentTypeId={assignmentTypeId}
          openSuccessDialog={(assignmentId) => {
            setCreatedAssignmentId(assignmentId || null);
            setOpenSuccessDialog(true);
          }}
        />
      </Flex>

      {addClassModalOpen && (
        <ClassSelectionDialog
          open={addClassModalOpen}
          setOpen={setAddClassModalOpen}
          triggerRefetch={() => setClassRefetch(classRefetch + 1)}
        />
      )}

      <StudentSubmitModal
        isOpen={openSuccessDialog}
        setIsOpen={setOpenSuccessDialog}
        studentId={student_id ? Number(student_id) : undefined}
        assignmentId={createdAssignmentId || undefined}
      />
    </Box>
  );
};

export default StudentCreateNewAssignmentBody;
