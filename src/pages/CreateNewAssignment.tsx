import { Box, Separator, Flex } from "@chakra-ui/react";
import CreateNewAssignmentIcon from "../assets/Create New Assignment.svg";
import PageHeader from "../components/common/pageHeader/PageHeader";
import HeaderCard from "../components/common/pageHeader/HeaderCard";
import UploadAssignmentBox from "../components/createNewAssignment/UploadAssignmentBox";
import DocumentForm from "../components/createNewAssignment/DocumentForm";
import SelectStudentsSection from "../components/createNewAssignment/SelectStudentsSection";
import SubmitForm from "../components/createNewAssignment/SubmitForm";
import { useState } from "react";

const CreateNewAssignment = () => {
  const cardText = `Create an assignment that adapts and grows to support every
                     student's needs. Let's make learning accessible for all!`;

  const [studentIds, setStudentIds] = useState<number[]>([]);
  const [title, setTitle] = useState<string>("");
  const [classId, setClassId] = useState<number | null>(null);
  const [assignmentTypeId, setAssignmentTypeId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  return (
    <Box margin={"2%"}>
      <PageHeader />
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
        // maxWidth="1200px"
        // mt={8}
      >
        <UploadAssignmentBox
          file={file}
          setFile={setFile}
    
        />
        <DocumentForm
          title={title}
          setTitle={setTitle}
          assignmentTypeId={assignmentTypeId}
          setAssignmentTypeId={setAssignmentTypeId}
          classId={classId}
          setClassId={setClassId}
        />
      </Flex>
      <Flex p={6}>
        <SelectStudentsSection
          studentIds={studentIds}
          setStudentIds={setStudentIds}
        />
      </Flex>

      <Flex>
        <SubmitForm
          studentIds={studentIds}
          title={title}
          classId={classId}
          file={file || new File([], "")}
          openSuccessDialog={() => setOpenSuccessDialog(true)}
        />
      </Flex>

      {/* {openSuccessDialog && (
        <AssignmentSubmitSuccess />
      )} */}

      {/* <HomeContent /> */}
    </Box>
  );
};

export default CreateNewAssignment;
