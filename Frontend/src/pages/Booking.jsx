import { useState } from "react";
import {
  Box,
  Button,
  Separator,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Booking() {
  const [tickets, setTickets] = useState(1);

  const event = {
    title: "Neon Music Festival",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    date: "12 October 2026",
    time: "6:00 PM",
    venue: "Chennai Trade Centre",
    price: 999,
  };

  const total = event.price * tickets;

  return (
    <Box bg="#F5F3FF" minH="100vh" p={8}>
      <Heading color="#2D1B69" mb={8}>
        Book Tickets
      </Heading>

      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.5fr 1fr",
        }}
        gap={8}
      >
        {/* Left Section */}
        <Box
          bg="white"
          p={6}
          borderRadius="2xl"
          boxShadow="lg"
        >
          <Image
            src={event.image}
            h="250px"
            w="100%"
            objectFit="cover"
            borderRadius="xl"
          />

          <VStack align="start" mt={5} gap={3}>
            <Heading size="lg">
              {event.title}
            </Heading>

            <HStack color="gray.600">
              <FaCalendarAlt />
              <Text>
                {event.date} • {event.time}
              </Text>
            </HStack>

            <HStack color="gray.600">
              <FaMapMarkerAlt />
              <Text>{event.venue}</Text>
            </HStack>

            <Separator width="100%" />

            <Text fontWeight="bold">
              Attendee Name
            </Text>

            <Input
              placeholder="Enter your name"
            />

            <Text fontWeight="bold">
              Email
            </Text>

            <Input
              type="email"
              placeholder="Enter your email"
            />

            <Text fontWeight="bold">
              Phone Number
            </Text>

            <Input
              type="tel"
              placeholder="Enter phone number"
            />

            <Text fontWeight="bold">
              Number of Tickets
            </Text>

            <HStack>
              <Button
                onClick={() =>
                  tickets > 1 &&
                  setTickets(tickets - 1)
                }
              >
                -
              </Button>

              <Box
                px={6}
                py={2}
                bg="gray.100"
                borderRadius="lg"
                fontWeight="bold"
              >
                {tickets}
              </Box>

              <Button
                onClick={() =>
                  setTickets(tickets + 1)
                }
              >
                +
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* Right Section */}
        <Box
          bg="white"
          p={6}
          borderRadius="2xl"
          boxShadow="lg"
          h="fit-content"
        >
          <Heading size="md" mb={5}>
            Booking Summary
          </Heading>

          <VStack
            gap={4}
            align="stretch"
          >
            <Flex justify="space-between">
              <Text>Ticket Price</Text>
              <Text>₹ {event.price}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text>Quantity</Text>
              <Text>{tickets}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text>Service Fee</Text>
              <Text>₹ 50</Text>
            </Flex>

            <Separator />

            <Flex justify="space-between">
              <Heading size="md">
                Total
              </Heading>

              <Heading
                size="md"
                color="purple.600"
              >
                ₹ {total + 50}
              </Heading>
            </Flex>

            <Button
              colorPalette="purple"
              size="lg"
              borderRadius="xl"
              mt={4}
            >
              Confirm Booking
            </Button>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}