
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function OrganizerDashboard() {
  return (
    <Box minH="100vh" bg="#080808" color="white" py={10}>
      <Container maxW="1200px">
        <VStack align="stretch" gap={8}>
          <Box>
            <Text color="#D4AF37" fontWeight="bold">
              ORGANIZER
            </Text>

            <Heading mt={2} color="#D4AF37">
              Organizer Dashboard
            </Heading>

            <Text color="gray.400" mt={2}>
              Create, manage and monitor your events.
            </Text>
          </Box>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            <Box
              bg="#111"
              border="1px solid #333"
              borderRadius="xl"
              p={6}
            >
              <Heading size="md" color="#D4AF37">
                Create Event
              </Heading>

              <Text color="gray.400" mt={3}>
                Create a new event and add ticket details.
              </Text>

              <Button
                as={Link}
                to="/organizer/create-event"
                mt={5}
                bg="#D4AF37"
                color="black"
              >
                Create Event
              </Button>
            </Box>

            <Box
              bg="#111"
              border="1px solid #333"
              borderRadius="xl"
              p={6}
            >
              <Heading size="md" color="#D4AF37">
                Manage Events
              </Heading>

              <Text color="gray.400" mt={3}>
                View, edit and delete your events.
              </Text>

              <Button
                as={Link}
                to="/organizer/manage-events"
                mt={5}
                bg="#D4AF37"
                color="black"
              >
                Manage Events
              </Button>
            </Box>

            <Box
              bg="#111"
              border="1px solid #333"
              borderRadius="xl"
              p={6}
            >
              <Heading size="md" color="#D4AF37">
                Attendees
              </Heading>

              <Text color="gray.400" mt={3}>
                View attendees who booked your events.
              </Text>

              <Button
                as={Link}
                to="/organizer/attendees"
                mt={5}
                bg="#D4AF37"
                color="black"
              >
                View Attendees
              </Button>
            </Box>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}

