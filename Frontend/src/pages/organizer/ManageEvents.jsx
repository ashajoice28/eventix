
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function ManageEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Rolling Loud India",
      date: "15 October 2026",
      venue: "Mumbai",
      tickets: 500,
      price: "₹1,499",
    },
    {
      id: 2,
      title: "Envo Music Festival",
      date: "25 October 2026",
      venue: "Bangalore",
      tickets: 300,
      price: "₹999",
    },
  ]);

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <Box minH="100vh" bg="#080808" color="white" py={10}>
      <Container maxW="1200px">
        <VStack align="stretch" gap={8}>
          <Box>
            <Text color="#D4AF37" fontWeight="bold">
              ORGANIZER
            </Text>

            <Heading mt={2} color="#D4AF37">
              Manage Events
            </Heading>

            <Text color="gray.400" mt={2}>
              Manage your created events and ticket information.
            </Text>
          </Box>

          {events.length === 0 ? (
            <Box
              bg="#111"
              border="1px solid #333"
              borderRadius="xl"
              p={10}
              textAlign="center"
            >
              <Heading size="md" color="#D4AF37">
                No Events Found
              </Heading>

              <Text color="gray.400" mt={3}>
                You have not created any events yet.
              </Text>
            </Box>
          ) : (
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                lg: 3,
              }}
              gap={6}
            >
              {events.map((event) => (
                <Box
                  key={event.id}
                  bg="#111"
                  border="1px solid #333"
                  borderRadius="xl"
                  overflow="hidden"
                >
                  <Box
                    h="160px"
                    bgGradient="linear(to-br, #D4AF37, #6B5412)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Heading
                      textAlign="center"
                      color="black"
                      px={5}
                      size="md"
                    >
                      {event.title}
                    </Heading>
                  </Box>

                  <Box p={6}>
                    <Heading size="md" color="#D4AF37">
                      {event.title}
                    </Heading>

                    <Text mt={3} color="gray.300">
                      📅 {event.date}
                    </Text>

                    <Text mt={2} color="gray.300">
                      📍 {event.venue}
                    </Text>

                    <Text mt={2} color="gray.300">
                      🎟 {event.tickets} tickets
                    </Text>

                    <Text mt={2} color="#D4AF37" fontWeight="bold">
                      {event.price}
                    </Text>

                    <Box display="flex" gap={3} mt={5}>
                      <Button
                        flex="1"
                        bg="#D4AF37"
                        color="black"
                      >
                        Edit
                      </Button>

                      <Button
                        flex="1"
                        bg="red.600"
                        color="white"
                        onClick={() => deleteEvent(event.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

