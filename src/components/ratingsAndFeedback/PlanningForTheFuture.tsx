import { Accordion, Span, Text } from "@chakra-ui/react";

const PlanningForTheFuture = () => {
    const title = "Planning for the Future";

    return (
        <Accordion.Item key={title} value={title}>
            <Accordion.ItemTrigger>
            <Span flex="1">{title}</Span>
            <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent
                bg="#cce0ff"
                padding={2}
            >
            <Accordion.ItemBody>
                <Text> VIEW / HIDE DOCUMENT INFO SECTION </Text>
            </Accordion.ItemBody>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};

export default PlanningForTheFuture;