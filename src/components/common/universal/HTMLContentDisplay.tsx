import { Box } from "@chakra-ui/react";

interface HtmlContentBoxProps {
  htmlContent?: string;
  padding?: number | string;
  height?: string | number;
  bg?: string;
}

const HtmlContentBox: React.FC<HtmlContentBoxProps> = ({
  htmlContent = "",
  padding = 5,
  height = "auto",
  bg = "white"
}) => {
  return (
    <Box
      p={padding}
      h={height}
      bg={bg}
      overflow={"auto"}
      css={{
        "& p": { marginBottom: "1em" },
        "& ul": {
          paddingLeft: "1.5em",
          listStyleType: "disc",
          marginBottom: "1em",
        },
        "& ol": {
          paddingLeft: "1.5em",
          listStyleType: "decimal",
          marginBottom: "1em",
        },
        "& li": { marginBottom: "0.5em" },
        "& h1, & h2, & h3": {
          fontWeight: "bold",
          marginTop: "1em",
          marginBottom: "0.5em",
        },
        "& strong": {
          color: "#244d8a", // highlight strong tags
        },
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default HtmlContentBox;
