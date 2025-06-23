"use client"

import {
  Box,

  HStack,

  Spacer,
} from "@chakra-ui/react"
import { useState } from "react"
import { CiCirclePlus } from "react-icons/ci"
import SearchBar from "../../common/searchBar/SearchBar"
import TextButton from "../../common/universal/TextButton"
import AssignmentsTable from "./AssignmetsTable"
import AssignmentsFilterButtons from "./AssignmentsFilterButtons"

const AssignmentsTab = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({
    from: new Date(),
    to: new Date(),
  })

  const handleCreateAssignment = () => {
    console.log("Create new assignment clicked")
  }

  return (
    <Box p={4} spaceY={4}>
      <HStack>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Assignments..."
        />
        <Spacer />
        <TextButton onClick={handleCreateAssignment}>
          <HStack gap={1}>
            <CiCirclePlus color="#bd4f23" />
            Create New Assignment
          </HStack>
        </TextButton>
      </HStack>

      <AssignmentsFilterButtons
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <AssignmentsTable
        dateRange={dateRange}
        searchTerm={searchTerm}
      />
    </Box>
  )
}

export default AssignmentsTab
