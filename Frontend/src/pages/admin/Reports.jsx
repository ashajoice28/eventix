import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Progress,
  Badge,
} from "@chakra-ui/react";

import {
  FaTicketAlt,
  FaRupeeSign,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Reports() {
  const statistics = [
    {
      title: "Total Revenue",
      value: "₹12.8L",
      icon: FaRupeeSign,
      color: "green.500",
    },
    {
      title: "Total Tickets Sold",
      value: "8,450",
      icon: FaTicketAlt,
      color: "purple.500",
    },
    {
      title: "Total Attendees",
      value: "6,240",
      icon: FaUsers,
      color: "blue.500",
    },
    {
      title: "Total Events",
      value: "156",
      icon: FaCalendarAlt,
      color: "orange.500",
    },
  ];

  const eventReports = [
    {
      name: "Neon Music Festival",
      tickets: 1250,
      revenue: "₹12.48L",
      status: "Popular",
    },
    {
      name: "AI Tech Summit",
      tickets: 980,
      revenue: "₹14.70L",
      status: "Published",
    },
    {
      name: "Kerala Food Carnival",
      tickets: 760,
      revenue: "₹4.55L",
      status: "Published",
    },
    {
      name: "Startup Expo",
      tickets: 540,
      revenue: "₹5.40L",
      status: "Upcoming",
    },
  ];

  const monthlyRevenue = [
    ["January", 65],
    ["February", 78],
    ["March", 92],
    ["April", 70],
    ["May", 85],
    ["June", 100],
  ];

  return (
    <Box
      bg="#F5F3FF"
      minH="100vh"
      p={8}
    >
      {/* Header */}
      <Box mb={8}>
        <Heading color="#2D1B69">
          Reports & Analytics
        </Heading>

        <Text color="gray.500" mt={2}>
          View Eventix platform performance and statistics
        </Text>
      </Box>

      {/* Statistics */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        mb={8}
      >
        {statistics.map((item, index) => {
          const Icon = item.icon;

          return (
            <Box
              key={index}
              bg="white"
              p={5}
              borderRadius="2xl"
              boxShadow="lg"
            >
              <HStack justify="space-between">
                <Box>
                  <Text
                    color="gray.500"
                    fontSize="sm"
                  >
                    {item.title}
                  </Text>

                  <Heading mt={2}>
                    {item.value}
                  </Heading>
                </Box>

                <Box
                  bg={item.color}
                  color="white"
                  p={3}
                  borderRadius="xl"
                >
                  <Icon size={24} />
                </Box>
              </HStack>
            </Box>
          );
        })}
      </Grid>

      {/* Revenue + Booking Overview */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "2fr 1fr",
        }}
        gap={6}
        mb={8}
      >
        {/* Monthly Revenue */}
        <Box
          bg="white"
          p={6}
          borderRadius="2xl"
          boxShadow="lg"
        >
          <Heading size="md" mb={6}>
            Monthly Revenue
          </Heading>

          <VStack gap={5} align="stretch">
            {monthlyRevenue.map(
              ([month, value]) => (
                <Box key={month}>
                  <Flex
                    justify="space-between"
                    mb={2}
                  >
                    <Text>{month}</Text>

                    <Text fontWeight="bold">
                      {value}%
                    </Text>
                  </Flex>

                  <Progress.Root
                    value={value}
                    colorPalette="purple"
                    borderRadius="full"
                  >
                    <Progress.Track>
                      <Progress.Range />
                    </Progress.Track>
                  </Progress.Root>
                </Box>
              )
            )}
          </VStack>
        </Box>

        {/* Booking Summary */}
        <Box
          bg="white"
          p={6}
          borderRadius="2xl"
          boxShadow="lg"
        >
          <Heading size="md" mb={6}>
            Booking Summary
          </Heading>

          <VStack gap={6}>
            <Box textAlign="center">
              <Heading color="green.500">
                7,820
              </Heading>

              <Text color="gray.500">
                Confirmed Bookings
              </Text>
            </Box>

            <Box textAlign="center">
              <Heading color="orange.500">
                420
              </Heading>

              <Text color="gray.500">
                Pending Bookings
              </Text>
            </Box>

            <Box textAlign="center">
              <Heading color="red.500">
                210
              </Heading>

              <Text color="gray.500">
                Cancelled Bookings
              </Text>
            </Box>
          </VStack>
        </Box>
      </Grid>

      {/* Event Performance */}
      <Box
        bg="white"
        p={6}
        borderRadius="2xl"
        boxShadow="lg"
      >
        <Heading size="md" mb={6}>
          Event Performance
        </Heading>

        <VStack gap={4} align="stretch">
          {eventReports.map((event, index) => (
            <Flex
              key={index}
              justify="space-between"
              align="center"
              p={4}
              border="1px solid"
              borderColor="gray.100"
              borderRadius="xl"
              gap={4}
              flexWrap="wrap"
            >
              <Box>
                <Heading size="sm">
                  {event.name}
                </Heading>

                <Text
                  fontSize="sm"
                  color="gray.500"
                  mt={1}
                >
                  {event.tickets} tickets sold
                </Text>
              </Box>

              <HStack gap={6}>
                <Box textAlign="right">
                  <Text
                    fontSize="sm"
                    color="gray.500"
                  >
                    Revenue
                  </Text>

                  <Text fontWeight="bold">
                    {event.revenue}
                  </Text>
                </Box>

                <Badge
                  colorPalette={
                    event.status === "Popular"
                      ? "purple"
                      : event.status === "Upcoming"
                      ? "orange"
                      : "green"
                  }
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {event.status}
                </Badge>
              </HStack>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}