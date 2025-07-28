import {
  Box,
  Heading,
  Image,
  VStack,
  Flex,

} from "@chakra-ui/react";


import modifiedAssignmentIcon from "../../assets/icons/note.png";
import RichTextEditor from "../common/universal/EditableHTMLContentBox";

interface UpdatedAssignmentSectionProps {
    updatedAssignment: string,
    setUpdatedAssignment: (HTMLContent: string) => void
}

const UpdatedAssignmentSection = ({updatedAssignment, setUpdatedAssignment}:UpdatedAssignmentSectionProps) => {
    return (
        <VStack>
            <Box borderWidth="1px" borderRadius="md" borderColor={"#244d8a"}>
              <Flex
                bg="#244d8a"
                color="white"
                px={4}
                py={2}
                align="center"
                justify="space-between"
                borderTopRadius="md"
              >
                <Image src={modifiedAssignmentIcon} height={"50px"} />

                <Heading>Modified Assignment</Heading>
              </Flex>
              <RichTextEditor
                value={updatedAssignment || ""}
                onChange={(newHtml) => setUpdatedAssignment(newHtml)}
                height="80vh"
              />
            </Box>
          </VStack>
    )
}

export default UpdatedAssignmentSection