import { Accordion, Span, Text } from "@chakra-ui/react";

const RateMyOptions = () => {
    const title = "Rate My Options";

    return (
        <Accordion.Item key={title} value={title}>
            <Accordion.ItemTrigger>
            <Span flex="1">{title}</Span>
            <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
            <Accordion.ItemBody>
                <Text> RATE MY OPTIONS SECTION </Text>
            </Accordion.ItemBody>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};

export default RateMyOptions;