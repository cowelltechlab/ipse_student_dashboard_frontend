import { Heading, HStack, VStack, Text, Spacer, Image } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import AssignmentsTableRowButtons from "../../common/assignments/AssignmentsTableRowButtons";

import AssignmentIcon from "../../../assets/contract.png"
import { useEffect } from "react";

interface AssignmentDetailsDocLineProps {
  assignment: AssignmentDetailType | null;
  assignmentVersionId?: number;
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

  useEffect(() => {
    console.log("AssignmentDetailsDocLine rendered with assignment:", assignment);
  }, [assignment]);
  return (
    <HStack align={"center"} w={"100%"} my={2} p={2}>
      <HStack align="start" spaceX={3}>
        <Image src={AssignmentIcon} alt="Assignment Icon" style={{ width: "50px", marginTop: "4px" }} />
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
            Date Modified:{""}
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
          triggerAssignmentsRefetch={() => {}}
          student_first_name={assignment?.student.first_name}
          student_last_name={assignment?.student.last_name}
          assignment_date_modified={assignment?.date_modified || assignment?.date_created}
        />
      )}
    </HStack>
  );
};

export default AssignmentDetailsDocLine;
