"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { useColorModeValue } from "./color-mode";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

export const notifySuccess = (title: string, description?: string) =>
  toaster.create({
    type: "success",
    title,
    description,
    duration: 4000,
    closable: true,
  });

export const notifyError = (title: string, description?: string) =>
  toaster.create({
    type: "error",
    title,
    description,
    duration: 7000,
    closable: true,
  });

export const notifyInfo = (title: string, description?: string) =>
  toaster.create({
    type: "info",
    title,
    description,
    duration: 3500,
    closable: true,
  });

export const Toaster = () => {
  // Define light/dark palettes ONCE (top level)
  const palette = useColorModeValue(
    {
      green: {
        bg: "green.50",
        border: "green.200",
        indicator: "green.500",
        icon: "green.700",
        text: "black",
        desc: "blackAlpha.700",
      },
      red: {
        bg: "red.50",
        border: "red.200",
        indicator: "red.500",
        icon: "red.700",
        text: "black",
        desc: "blackAlpha.700",
      },
      blue: {
        bg: "blue.50",
        border: "blue.200",
        indicator: "blue.500",
        icon: "blue.700",
        text: "black",
        desc: "blackAlpha.700",
      },
      gray: {
        bg: "gray.50",
        border: "gray.200",
        indicator: "gray.500",
        icon: "gray.700",
        text: "black",
        desc: "blackAlpha.700",
      },
    },
    {
      green: {
        bg: "green.800",
        border: "green.700",
        indicator: "green.300",
        icon: "green.200",
        text: "whiteAlpha.900",
        desc: "whiteAlpha.800",
      },
      red: {
        bg: "red.800",
        border: "red.700",
        indicator: "red.300",
        icon: "red.200",
        text: "whiteAlpha.900",
        desc: "whiteAlpha.800",
      },
      blue: {
        bg: "blue.800",
        border: "blue.700",
        indicator: "blue.300",
        icon: "blue.200",
        text: "whiteAlpha.900",
        desc: "whiteAlpha.800",
      },
      gray: {
        bg: "gray.800",
        border: "gray.700",
        indicator: "gray.300",
        icon: "gray.200",
        text: "whiteAlpha.900",
        desc: "whiteAlpha.800",
      },
    }
  );

  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => {
          const tone =
            toast.type === "success"
              ? "green"
              : toast.type === "error"
              ? "red"
              : toast.type === "loading"
              ? "blue"
              : "gray";

          const c = palette[tone as keyof typeof palette];
          const IconCmp =
            toast.type === "success"
              ? CheckCircle2
              : toast.type === "error"
              ? AlertTriangle
              : Info;

          return (
            <Toast.Root
              width={{ md: "sm" }}
              boxShadow="lg"
              borderWidth="1px"
              rounded="lg"
              px="3"
              py="2"
              bg={c.bg}
              borderColor={c.border}
              color={c.text}
            >
              {toast.type === "loading" ? <Spinner size="sm" /> : null}

              <HStack align="start" gap="2" flex="1" maxW="100%">
                {toast.type !== "loading" && (
                  <Icon as={IconCmp} boxSize="4" mt="0.5" color={c.icon} />
                )}

                <Stack gap="1" flex="1" maxW="100%">
                  {toast.title && (
                    // Use Toast.Title but clamp with CSS (no noOfLines on Title)
                    <Toast.Title
                      fontWeight={
                        toast.type === "success" || toast.type === "error"
                          ? "semibold"
                          : "medium"
                      }
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {toast.title}
                    </Toast.Title>
                  )}

                  {toast.description && (
                    // Put Text inside Description to use noOfLines
                    <Toast.Description>
                      <Text color={c.desc}>{toast.description}</Text>
                    </Toast.Description>
                  )}
                </Stack>
              </HStack>

              {toast.action && (
                // Toast.ActionTrigger doesn't accept variant/size; keep it minimal or style with plain props
                <Toast.ActionTrigger
                  // basic styling via style props is typically allowed; omit variant/size
                  px="2"
                  py="1"
                  borderRadius="md"
                  bg="blackAlpha.200"
                  _dark={{ bg: "whiteAlpha.200" }}
                  _hover={{
                    bg: "blackAlpha.300",
                    _dark: { bg: "whiteAlpha.300" },
                  }}
                >
                  {toast.action.label}
                </Toast.ActionTrigger>
              )}

              {toast.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          );
        }}
      </ChakraToaster>
    </Portal>
  );
};
