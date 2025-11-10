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
        "& ul, & ol": {
          paddingLeft: "0",
          marginBottom: "1em",
        },
        "& li": {
          marginBottom: "0.5em",
          marginLeft: "1.5em",
        },
        // Top-level ordered lists: 1, 2, 3...
        "& ol": {
          listStyleType: "decimal",
        },
        // Nested ordered lists: a, b, c...
        "& ol ol": {
          listStyleType: "lower-alpha",
        },
        // Double-nested ordered lists: i, ii, iii...
        "& ol ol ol": {
          listStyleType: "lower-roman",
        },
        // Top-level unordered lists: solid bullets
        "& ul": {
          listStyleType: "disc",
        },
        // Nested unordered lists: hollow bullets
        "& ul ul": {
          listStyleType: "circle",
        },
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
