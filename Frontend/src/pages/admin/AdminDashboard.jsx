import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Avatar,
} from "@chakra-ui/react";
import {
  FaUsers,
  FaCalendarAlt,
  FaTicketAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";

const stats = [
  { title: "Total Users", value: "1,248", icon: FaUsers, color: "purple.500" },
  { title: "Total Events", value: "86", icon: FaCalendarAlt, color: "blue.500" },
  { title: "Tickets Sold", value: "5,420", icon: FaTicketAlt, color: "pink.500" },
  { title: "Revenue", value: "₹ 8.5 L", icon: FaMoneyBillWave, color: "green.500" },
];

const pendingEvents = [
  { name: "Neon Music Festival", organizer: "Arun Events" },
  { name: "AI Tech Summit", organizer: "CodeHub" },
  { name: "Kerala Food Carnival", organizer: "Taste Kerala" },
];

export default function AdminDashboard() {
  return (
    <Flex minH="100vh" bg="#F4F0FF">
      {/* Sidebar */}
      <Box w="260px" bg="#1A1333" color="white" p={6}>
        <Heading size="lg" color="purple.300" mb={10}>
          EVENTIX
        </Heading>

        <VStack align="stretch" spacing={4}>
          <Button justifyContent="start" colorScheme="purple" variant="solid">
            Dashboard
          </Button>

          <Button justifyContent="start" variant="ghost" color="white">
            Manage Users
          </Button>

          <Button justifyContent="start" variant="ghost" color="white">
            Manage Events
          </Button>

          <Button justifyContent="start" variant="ghost" color="white">
            Bookings
          </Button>

          <Button justifyContent="start" variant="ghost" color="white">
            Reports
          </Button>

          <Button justifyContent="start" variant="ghost" color="white">
            Settings
          </Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={8}>
        {/* Top Bar */}
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">Admin Dashboard</Heading>
            <Text color="gray.500">
              Welcome back, Administrator 👋
            </Text>
          </Box>

          <HStack spacing={3}>
            <Avatar name="Admin" bg="purple.500" />
            <Box>
              <Text fontWeight="bold">Admin</Text>
              <Text fontSize="sm" color="gray.500">
                Eventix
              </Text>
            </Box>
          </HStack>
        </Flex>

        {/* Statistics */}
        <Grid templateColumns="repeat(4,1fr)" gap={6}>
          {stats.map((item) => (
            <Box
              key={item.title}
              bg="white"
              p={5}
              borderRadius="2xl"
              boxShadow="lg"
            >
              <HStack justify="space-between">
                <Box>
                  <Text color="gray.500" fontSize="sm">
                    {item.title}
                  </Text>

                  <Heading mt={2}>{item.value}</Heading>
                </Box>

                <Box
                  p={3}
                  borderRadius="xl"
                  bg={item.color}
                  color="white"
                >
                  <item.icon size={24} />
                </Box>
              </HStack>
            </Box>
          ))}
        </Grid>

        {/* Analytics & Pending */}
        <Grid templateColumns="2fr 1fr" gap={6} mt={8}>
          {/* Revenue */}
          <Box bg="white" p={6} borderRadius="2xl" boxShadow="lg">
            <HStack justify="space-between" mb={4}>
              <Heading size="md">Revenue Analytics</Heading>
              <FaChartLine color="#6B46C1" />
            </HStack>

            <Flex align="end" justify="space-between" h="220px">
              {[45, 70, 55, 90, 80, 110, 95].map((h, i) => (
                <VStack key={i} spacing={2}>
                  <Box
                    w="38px"
                    h={`${h * 1.5}px`}
                    bgGradient="linear(to-t,purple.500,pink.400)"
                    borderRadius="lg"
                  />

                  <Text fontSize="xs">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][i]}
                  </Text>
                </VStack>
              ))}
            </Flex>
          </Box>

          {/* Pending Events */}
          <Box bg="white" p={6} borderRadius="2xl" boxShadow="lg">
            <Heading size="md" mb={4}>
              Pending Approval
            </Heading>

            <VStack spacing={4} align="stretch">
              {pendingEvents.map((event) => (
                <Box
                  key={event.name}
                  border="1px solid"
                  borderColor="gray.200"
                  p={3}
                  borderRadius="lg"
                >
                  <Text fontWeight="bold">{event.name}</Text>

                  <Text fontSize="sm" color="gray.500">
                    {event.organizer}
                  </Text>

                  <Button
                    mt={3}
                    colorScheme="green"
                    size="sm"
                    w="100%"
                    leftIcon={<FaCheckCircle />}
                  >
                    Approve
                  </Button>
                </Box>
              ))}
            </VStack>
          </Box>
        </Grid>

        {/* Recent Activity */}
        <Box
          mt={8}
          bg="white"
          p={6}
          borderRadius="2xl"
          boxShadow="lg"
        >
          <Heading size="md" mb={4}>
            Recent Activity
          </Heading>

          <VStack align="stretch" spacing={3}>
            <Flex justify="space-between">
              <Text>New user registered</Text>
              <Text color="gray.500">2 min ago</Text>
            </Flex>

            <Flex justify="space-between">
              <Text>50 tickets booked for AI Summit</Text>
              <Text color="gray.500">15 min ago</Text>
            </Flex>

            <Flex justify="space-between">
              <Text>Organizer created new event</Text>
              <Text color="gray.500">1 hour ago</Text>
            </Flex>

            <Flex justify="space-between">
              <Text>Food Carnival submitted for approval</Text>
              <Text color="gray.500">3 hours ago</Text>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}