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

// TODO: Refer to Figma for details, including styling
// TODO: Make accordian arrow match Figma
// TODO: Connect to backend to automatically retrieve form info

const AssignmentRatingAndFeedback = () => {
    const breadcrumbItems: BreadcrumbItem[] = [
        {label: "studentName", href: "studentProfileLink"}
    ]

    return (
        <Box
            margin={2}
        >
            <PageHeader />
            <BreadcrumbNav 
                items={breadcrumbItems} 
                // TODO: Fix. Doesn't appear properly
            />
            <VStack>
                <Box justifyContent="left" width="100%">
                    <Text
                        alignContent="left" 
                        fontSize="lg"
                        fontWeight="bold"
                    >
                        Feedback & Rating
                    </Text>
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

export default AssignmentRatingAndFeedback;