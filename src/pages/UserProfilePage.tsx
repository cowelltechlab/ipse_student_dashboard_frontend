import { Box } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";
import UserProfilePageContent from "../components/userProfile/UserProfilePageContent";

const UserProfilePage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "My Profile" },
  ];

  return (
    <Box>
      <PageHeader />
      <BreadcrumbNav items={breadcrumbItems} />
      <UserProfilePageContent />
    </Box>
  );
};

export default UserProfilePage;
