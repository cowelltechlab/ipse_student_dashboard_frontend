import { Box, VStack, Text, Separator, Accordion } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";
import ViewDocumentInfo from "../components/ratingsAndFeedback/ViewDocumentInfo";
import Goals from "../components/ratingsAndFeedback/Goals";
import RateMyOptions from "../components/ratingsAndFeedback/RateMyOptions";
import PlanningForTheFuture from "../components/ratingsAndFeedback/PlanningForTheFuture";
import SubmitFinalRatingButton from "../components/ratingsAndFeedback/SubmitFinalRatingButton";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

// interface RatingsAndFeedbackPageProps {
//     studentName: string;
//     studentProfileLink: string;
// }

const RatingsAndFeedbackPage = () => {
    const breadcrumbItems: BreadcrumbItem[] = [
        {label: "studentName", href: "studentProfileLink"}
    ]

    return (
        <Box>
            <PageHeader />
            <BreadcrumbNav items={breadcrumbItems} />
            <VStack>
                <Box alignContent="left">
                    <Text alignContent="left" fontSize="lg">Feedback & Rating</Text>
                </Box>
                <Separator variant="solid" />
                <Accordion.Root collapsible>
                    <ViewDocumentInfo />
                    <Goals />
                    <RateMyOptions />
                    <PlanningForTheFuture />
                </Accordion.Root>
                <SubmitFinalRatingButton />
            </VStack>
        </Box>
    );
}

export default RatingsAndFeedbackPage;