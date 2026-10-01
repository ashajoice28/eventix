import { useState } from "react";
import {
  Box,
  Badge,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaMinus,
  FaPlus,
  FaTicketAlt,
} from "react-icons/fa";

export default function EventDetails() {
  const [tickets, setTickets] = useState(1);

  const event = {
    title: "Neon Music Festival 2026",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200",
    date: "12 October 2026",
    time: "6:00 PM",
    venue: "Chennai Trade Centre",
    city: "Chennai",
    organizer: "Eventix Entertainment",
    seats: 250,
    price: 999,
    description:
      "Experience India's biggest live music festival featuring top artists, DJs, laser shows and unforgettable performances. Book your tickets now and enjoy an incredible night with thousands of music lovers.",
  };

  return (
    <Box
      bg="#F5F3FF"
      minH="100vh"
      py={8}
      px={{ base: 4, md: 6 }}
    >
      <Grid
        maxW="1200px"
        mx="auto"
        templateColumns={{
          base: "1fr",
          lg: "2fr 1fr",
        }}
        gap={8}
      >
        {/* Left */}
        <Box>
          <Image
            src={event.image}
            w="100%"
            h={{ base: "250px", md: "420px" }}
            objectFit="cover"
            borderRadius="2xl"
          />

          <VStack
            align="start"
            gap={4}
            mt={6}
          >
            <Badge
              colorPalette="purple"
              px={3}
              py={1}
              borderRadius="full"
            >
              {event.category}
            </Badge>

            <Heading
              size="xl"
              color="#2D1B69"
            >
              {event.title}
            </Heading>

            <HStack color="gray.600">
              <FaCalendarAlt />
              <Text>{event.date}</Text>
            </HStack>

            <HStack color="gray.600">
              <FaClock />
              <Text>{event.time}</Text>
            </HStack>

            <HStack color="gray.600">
              <FaMapMarkerAlt />
              <Text>
                {event.venue}, {event.city}
              </Text>
            </HStack>

            <HStack color="gray.600">
              <FaUsers />
              <Text>{event.organizer}</Text>
            </HStack>

            <Separator width="100%" />

            <Heading size="md">
              About This Event
            </Heading>

            <Text
              color="gray.700"
              lineHeight="1.8"
            >
              {event.description}
            </Text>
          </VStack>
        </Box>

        {/* Right */}
        <Box
          bg="white"
          p={6}
          borderRadius="2xl"
          boxShadow="lg"
          h="fit-content"
          position={{ lg: "sticky" }}
          top={{ lg: "100px" }}
        >
          <VStack
            align="stretch"
            gap={5}
          >
            <Box>
              <Text
                color="gray.500"
                fontSize="sm"
              >
                Starting From
              </Text>

              <Heading color="purple.600">
                ₹ {event.price}
              </Heading>
            </Box>

            <Separator />

            <Flex justify="space-between">
              <Text>Available Seats</Text>

              <Text fontWeight="bold">
                {event.seats}
              </Text>
            </Flex>

            <Box>
              <Text mb={2}>
                Select Tickets
              </Text>

              <HStack>
                <Button
                  size="sm"
                  onClick={() =>
                    tickets > 1 &&
                    setTickets(tickets - 1)
                  }
                >
                  <FaMinus />
                </Button>

                <Box
                  flex={1}
                  textAlign="center"
                  py={2}
                  bg="gray.100"
                  borderRadius="lg"
                  fontWeight="bold"
                >
                  {tickets}
                </Box>

                <Button
                  size="sm"
                  onClick={() =>
                    tickets < event.seats &&
                    setTickets(tickets + 1)
                  }
                >
                  <FaPlus />
                </Button>
              </HStack>
            </Box>

            <Separator />

            <Flex
              justify="space-between"
              align="center"
            >
              <Text fontWeight="semibold">
                Total Amount
              </Text>

              <Heading
                size="md"
                color="purple.600"
              >
                ₹ {tickets * event.price}
              </Heading>
            </Flex>

            <Button
              colorPalette="purple"
              size="lg"
              borderRadius="xl"
            >
              <FaTicketAlt />
              Book Now
            </Button>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}