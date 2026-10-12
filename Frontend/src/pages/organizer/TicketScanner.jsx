import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  FaArrowLeft,
  FaQrcode,
} from "react-icons/fa";

export default function TicketScanner() {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg="#050505" color="white" py={10} px={4}>
      <Box maxW="800px" mx="auto">

        <Button
          variant="outline"
          borderColor="#D4AF37"
          color="#D4AF37"
          mb={7}
          onClick={() => navigate("/organizer")}
          _hover={{
            bg: "#D4AF37",
            color: "black",
          }}
        >
          <FaArrowLeft />
          Dashboard
        </Button>

        <Box
          bg="#111111"
          border="1px solid"
          borderColor="rgba(212,175,55,0.2)"
          borderRadius="14px"
          p={{ base: 6, md: 10 }}
        >
          <VStack gap={5} textAlign="center">

            <Box color="#D4AF37">
              <FaQrcode size={60} />
            </Box>

            <Heading color="#D4AF37">
              Ticket Scanner
            </Heading>

            <Text color="gray.400">
              Scan the QR code from an attendee's Eventix ticket.
            </Text>

            <Box
              w="100%"
              maxW="500px"
              minH="350px"
              border="2px dashed"
              borderColor="#D4AF37"
              borderRadius="14px"
              display="grid"
              placeItems="center"
            >
              <Text color="gray.500">
                QR Scanner will appear here
              </Text>
            </Box>

            <Text color="gray.500" fontSize="sm">
              Ticket verification will be connected to the backend.
            </Text>

          </VStack>
        </Box>
      </Box>
    </Box>
  );
}