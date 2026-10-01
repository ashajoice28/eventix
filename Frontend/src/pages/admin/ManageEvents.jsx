import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Table,
  Badge,
  Text,
} from "@chakra-ui/react";

import { FaEdit, FaTrash } from "react-icons/fa";

const events = [
  {
    id: 1,
    title: "Neon Music Festival",
    category: "Music",
    city: "Chennai",
    date: "12 Oct 2026",
    price: "₹999",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
  },
  {
    id: 2,
    title: "AI Tech Summit",
    category: "Technology",
    city: "Bangalore",
    date: "22 Oct 2026",
    price: "₹1499",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
  },
  {
    id: 3,
    title: "Kerala Food Carnival",
    category: "Festival",
    city: "Trivandrum",
    date: "05 Nov 2026",
    price: "₹599",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
];

export default function ManageEvents() {
  return (
    <Box
      bg="#F5F3FF"
      minH="100vh"
      p={8}
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        gap={4}
        flexWrap="wrap"
      >
        <Box>
          <Heading color="#2D1B69">
            Manage Events
          </Heading>

          <Text color="gray.500">
            View, edit and delete all events
          </Text>
        </Box>

        <Button colorPalette="purple">
          + Add Event
        </Button>
      </Flex>

      {/* Search + Filter */}
      <Flex
        gap={4}
        mb={6}
        flexWrap="wrap"
      >
        <Input
          placeholder="Search events..."
          bg="white"
          borderRadius="xl"
          maxW="500px"
        />

        <select
          style={{
            width: "220px",
            height: "40px",
            padding: "0 12px",
            border: "1px solid #CBD5E0",
            borderRadius: "12px",
            background: "white",
            fontSize: "16px",
          }}
        >
          <option>All Categories</option>
          <option>Music</option>
          <option>Technology</option>
          <option>Festival</option>
          <option>Sports</option>
        </select>
      </Flex>

      {/* Table */}
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        overflowX="auto"
      >
        <Table.Root>
          <Table.Header bg="purple.50">
            <Table.Row>
              <Table.ColumnHeader>
                Event
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Category
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                City
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Date
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Price
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Status
              </Table.ColumnHeader>

              <Table.ColumnHeader textAlign="center">
                Action
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {events.map((event) => (
              <Table.Row key={event.id}>
                <Table.Cell>
                  <HStack gap={4}>
                    <Image
                      src={event.image}
                      alt={event.title}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="lg"
                    />

                    <Text fontWeight="bold">
                      {event.title}
                    </Text>
                  </HStack>
                </Table.Cell>

                <Table.Cell>
                  {event.category}
                </Table.Cell>

                <Table.Cell>
                  {event.city}
                </Table.Cell>

                <Table.Cell>
                  {event.date}
                </Table.Cell>

                <Table.Cell>
                  {event.price}
                </Table.Cell>

                <Table.Cell>
                  <Badge
                    colorPalette={
                      event.status === "Approved"
                        ? "green"
                        : "orange"
                    }
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {event.status}
                  </Badge>
                </Table.Cell>

                <Table.Cell>
                  <HStack
                    justify="center"
                    gap={2}
                  >
                    <Button
                      size="sm"
                      colorPalette="blue"
                    >
                      <FaEdit />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      colorPalette="red"
                    >
                      <FaTrash />
                      Delete
                    </Button>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}