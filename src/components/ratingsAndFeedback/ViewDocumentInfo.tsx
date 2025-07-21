import { Text, Accordion, Span } from "@chakra-ui/react";

const ViewDocumentInfo = () => {
    const title = "View/Hide Document Info";

    return (
        <Accordion.Item key={title} value={title}>
            <Accordion.ItemTrigger>
            <Span flex="1">{title}</Span>
            <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
            <Accordion.ItemBody>
                <Text> VIEW / HIDE DOCUMENT INFO SECTION </Text>
            </Accordion.ItemBody>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};

export default ViewDocumentInfo;