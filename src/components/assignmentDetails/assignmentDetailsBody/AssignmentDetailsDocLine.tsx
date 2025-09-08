import { Heading, HStack, VStack, Text, Spacer } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import { IoDocumentText } from "react-icons/io5";
import AssignmentsTableRowButtons from "../../common/assignments/AssignmentsTableRowButtons";

interface AssignmentDetailsDocLineProps {
  assignment: AssignmentDetailType | null;
  fileName?: string;
  downloadUrl?: string;
  versionNumber?: string;
  dateModified?: string;
  children?: React.ReactNode; // allow custom buttons or actions
}

const AssignmentDetailsDocLine = ({
  assignment,
  fileName,
  downloadUrl,
  versionNumber,
  dateModified,
  children,
}: AssignmentDetailsDocLineProps) => {
  return (
    <HStack align={"center"} w={"100%"} my={2} p={2}>
      <HStack align="start" spaceX={3}>
        <IoDocumentText size={"25px"} style={{ marginTop: 4 }} />
        <VStack align="start" spaceX={0}>
          <HStack>
            {" "}
            <Heading fontSize={"md"} fontWeight="bold">
              {assignment?.title}
            </Heading>
          </HStack>

          <Text fontSize="sm" color="gray.500">
            Student: {assignment?.student.first_name}{" "}
            {assignment?.student.last_name}
          </Text>
          {versionNumber && (
            <Text fontSize="sm" color="gray.500">
              Version Number: {versionNumber}
            </Text>
          )}
          <Text fontSize="sm" color="gray.500">
            Date Modified:{" "}
            {(() => {
              const date =
                dateModified ??
                assignment?.date_modified ??
                assignment?.date_created;

              return date ? new Date(date).toLocaleDateString() : "N/A";
            })()}
          </Text>
        </VStack>
      </HStack>

      <Spacer />

      {children ?? (
        <AssignmentsTableRowButtons
          fileName={fileName}
          fileType={assignment?.source_format}
          downloadUrl={downloadUrl}
          final_version_id={assignment?.final_version_id || null}
          assignment_id={assignment?.id ?? 0}
          student_id={assignment?.student.id ?? 0}
        />
      )}
    </HStack>
  );
};

export default AssignmentDetailsDocLine;
