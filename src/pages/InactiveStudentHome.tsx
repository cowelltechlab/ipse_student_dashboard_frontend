import { Box, Skeleton } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";
import { useState } from "react";
import StudentProfilePageContent from "../components/studentProfile/StudentProfilePageContent";
import ProfileCreationDialog from "../components/profileCreation/ProfileCreationDialog";
import { useParams } from "react-router-dom";

const StudentProfile = () => {
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  const { user_id } = useParams<{ user_id: string }>();

  const breadcrumbItems = [
    { label: <Skeleton height="20px" width="100px" /> },
    { label: <Skeleton height="20px" width="100px" /> },
  ];

  return (
    <Box>
      <PageHeader />
      <BreadcrumbNav items={breadcrumbItems} />
      <StudentProfilePageContent
        student={null}
        profileLoading={true}
        triggerRefetch={() => setRefetchTrigger(refetchTrigger + 1)}
      />
     {user_id && <ProfileCreationDialog
        open={true}
        setOpen={() => {}}
        userId={user_id as unknown as number}
      />}
    </Box>
  );
};

export default StudentProfile;
