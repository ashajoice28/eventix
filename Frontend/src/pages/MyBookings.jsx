import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDownload,
  FaTimes,
} from "react-icons/fa";

const bookings = [
  {
    id: 1,
    title: "Neon Music Festival",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
    date: "12 Oct 2026",
    location: "Chennai",
    tickets: 2,
    total: 1998,
    status: "Confirmed",
  },
  {
    id: 2,
    title: "AI Tech Summit",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    date: "22 Oct 2026",
    location: "Bangalore",
    tickets: 1,
    total: 1499,
    status: "Pending",
  },
  {
    id: 3,
    title: "Kerala Cultural Fest",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    date: "05 Nov 2026",
    location: "Trivandrum",
    tickets: 3,
    total: 1797,
    status: "Cancelled",
  },
];

export default function MyBookings() {
  return (
    <Box bg="#F5F3FF" minH="100vh" p={8}>
      {/* Header */}
      <Box mb={8}>
        <Heading color="#2D1B69">
          My Bookings
        </Heading>

        <Text color="gray.500" mt={2}>
          View and manage your booked tickets
        </Text>
      </Box>

      <Grid
        templateColumns="repeat(auto-fit, minmax(340px, 1fr))"
        gap={6}
      >
        {bookings.map((booking) => (
          <Box
            key={booking.id}
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="lg"
          >
            <Image
              src={booking.image}
              h="190px"
              w="100%"
              objectFit="cover"
            />

            <VStack
              align="start"
              p={5}
              gap={3}
            >
              <Flex
                justify="space-between"
                w="100%"
                gap={3}
              >
                <Heading size="md">
                  {booking.title}
                </Heading>

                <Badge
                  colorPalette={
                    booking.status === "Confirmed"
                      ? "green"
                      : booking.status === "Pending"
                      ? "orange"
                      : "red"
                  }
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {booking.status}
                </Badge>
              </Flex>

              <HStack
                color="gray.600"
                fontSize="sm"
              >
                <FaCalendarAlt />
                <Text>{booking.date}</Text>
              </HStack>

              <HStack
                color="gray.600"
                fontSize="sm"
              >
                <FaMapMarkerAlt />
                <Text>{booking.location}</Text>
              </HStack>

              <Flex
                justify="space-between"
                w="100%"
              >
                <Text>Tickets</Text>

                <Text fontWeight="bold">
                  {booking.tickets}
                </Text>
              </Flex>

              <Flex
                justify="space-between"
                w="100%"
              >
                <Text>Total Paid</Text>

                <Text
                  color="purple.600"
                  fontWeight="bold"
                >
                  ₹ {booking.total}
                </Text>
              </Flex>

              <HStack
                w="100%"
                pt={3}
                gap={3}
              >
                <Button
                  colorPalette="purple"
                  flex={1}
                >
                  <FaDownload />
                  Ticket
                </Button>

                <Button
                  colorPalette="red"
                  variant="outline"
                  flex={1}
                >
                  <FaTimes />
                  Cancel
                </Button>
              </HStack>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}