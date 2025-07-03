import {
    Fieldset,
    Field,
    Text,
    HStack
} from "@chakra-ui/react"

const SelectStudentsSection = () => {
    return (
        <HStack>
            <Fieldset.Root>
                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label fontWeight="bold" fontSize="lg">
                            Select Students
                        </Field.Label>
                    </Field.Root>
                </Fieldset.Content>
            </Fieldset.Root>
        </HStack>
    );
}

export default SelectStudentsSection;