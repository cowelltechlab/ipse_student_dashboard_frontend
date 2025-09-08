import { Box, Breadcrumb } from "@chakra-ui/react";
import { type ReactNode } from "react";

interface BreadcrumbItem {
  label: ReactNode; // changed from string to ReactNode
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  size?: "sm" | "md" | "lg";
  variant?: "plain" | "underline";
}

const BreadcrumbNav = ({
  items,
  size = "md",
  variant = "plain",
}: BreadcrumbNavProps) => {
  return (
    <Box ml={4} mb={4}>
      <Breadcrumb.Root size={size} variant={variant}>
        <Breadcrumb.List>
          {items.flatMap((item, i) => {
            const element = (
              <Breadcrumb.Item key={i} >
                {i === items.length - 1 ? (
                  <Breadcrumb.CurrentLink color="#244D8A" fontWeight={"bold"}>{item.label}</Breadcrumb.CurrentLink>
                ) : (
                  <Breadcrumb.Link href={item.href || "#"} >
                    {item.label}
                  </Breadcrumb.Link>
                )}
              </Breadcrumb.Item>
            );
            return i < items.length - 1
              ? [element, <Breadcrumb.Separator key={`sep-${i}`} />]
              : [element];
          })}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Box>
  );
};

export default BreadcrumbNav;
