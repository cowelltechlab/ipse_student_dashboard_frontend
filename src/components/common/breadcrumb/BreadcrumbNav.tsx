import { Box, Breadcrumb } from "@chakra-ui/react";

interface BreadcrumbItem {
  label: string;
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
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <Breadcrumb.Item key={item.label}>
                {isLast ? (
                  <Breadcrumb.CurrentLink>{item.label}</Breadcrumb.CurrentLink>
                ) : (
                  <>
                    <Breadcrumb.Link href={item.href || "#"}>
                      {item.label}
                    </Breadcrumb.Link>
                    <Breadcrumb.Separator />
                  </>
                )}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Box>
  );
};

export default BreadcrumbNav;
