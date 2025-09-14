import { Button, Stack, Image } from "@chakra-ui/react";

import stronglyDisagreeIcon from "../../assets/icons/worst_sad.png";
import disagreeIcon from "../../assets/icons/sad.png";
import neutralIcon from "../../assets/icons/neutral.png";
import agreeIcon from "../../assets/icons/happy.png";
import stronglyAgreeIcon from "../../assets/icons/best_happy.png";

interface LikertButtonsProps {
  selection: string;
  onSelectionChange: (selection: string) => void;
}

const LikertButtons = ({
  selection,
  onSelectionChange,
}: LikertButtonsProps) => {
  const likertButtonsContent = [
    { icon: stronglyDisagreeIcon, text: "Strongly Disagree" },
    { icon: disagreeIcon, text: "Disagree" },
    { icon: neutralIcon, text: "Neutral" },
    { icon: agreeIcon, text: "Agree" },
    { icon: stronglyAgreeIcon, text: "Strongly Agree" },
  ];

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      gap={4}
      justify="center"
      mt={4}
    >
      {likertButtonsContent.map((button, index) => (
        <Button
          key={index}
          border={selection === button.text ? "2px solid" : "1px solid"}
          onClick={() => onSelectionChange(button.text)}
          variant={"outline"}
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          p={3}
          color={selection === button.text ? "white" : "black"}
          bg={selection === button.text ? "#244D8A" : "white"}
          borderRadius={"xl"}
          h={"100%"}
        >
          <Image src={button.icon} alt={button.text} h={"50px"} />
          {button.text}
        </Button>
      ))}
    </Stack>
  );
};

export default LikertButtons;
