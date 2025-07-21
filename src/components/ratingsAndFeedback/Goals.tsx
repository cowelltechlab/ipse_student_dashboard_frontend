import { Text, Span, Accordion } from "@chakra-ui/react";

const Goals = () => {
    const title = "Goals";

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
                <Text> GOALS SECTION </Text>
            </Accordion.ItemBody>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};

export default Goals;