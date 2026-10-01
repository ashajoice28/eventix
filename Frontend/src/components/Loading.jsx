import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

export default function Loading({
  message = "Loading, please wait...",
}) {
  return (
    <Box
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#F5F3FF"
    >
      <VStack spacing={5}>
        <Spinner
          thickness="4px"
          speed="0.8s"
          emptyColor="gray.200"
          color="purple.500"
          size="xl"
        />

        <Text
          fontSize="lg"
          fontWeight="medium"
          color="purple.700"
        >
          {message}
        </Text>
      </VStack>
    </Box>
  );
}