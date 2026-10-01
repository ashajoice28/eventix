import { useState } from "react";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Table,
  Text,
} from "@chakra-ui/react";

import { FaDownload } from "react-icons/fa";

const attendeesData = [
  {
    id: 1,
    name: "Asha Joice",
    email: "asha@gmail.com",
    ticket: "VIP",
    seats: 2,
    payment: "Paid",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    ticket: "Regular",
    seats: 1,
    payment: "Paid",
  },
  {
    id: 3,
    name: "Meera Nair",
    email: "meera@gmail.com",
    ticket: "VIP",
    seats: 3,
    payment: "Pending",
  },
  {
    id: 4,
    name: "Arun Das",
    email: "arun@gmail.com",
    ticket: "Regular",
    seats: 1,
    payment: "Paid",
  },
];

export default function Attendees() {
  const [search, setSearch] = useState("");

  const filtered = attendeesData.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
            Event Attendees
          </Heading>

          <Text color="gray.500">
            Manage registered participants
          </Text>
        </Box>

        <Button colorPalette="purple">
          <FaDownload />
          Export CSV
        </Button>
      </Flex>

      {/* Search */}
      <Input
        placeholder="Search attendee..."
        bg="white"
        mb={6}
        borderRadius="xl"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* Table */}
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        overflowX="auto"
      >
        <Table.Root
          variant="outline"
          size="md"
        >
          <Table.Header bg="purple.50">
            <Table.Row>
              <Table.ColumnHeader>
                Attendee
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Email
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Ticket
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Seats
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Payment
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filtered.map((person) => (
              <Table.Row key={person.id}>
                <Table.Cell>
                  <HStack gap={3}>
                    <Avatar.Root
                      size="sm"
                      bg="purple.500"
                    >
                      <Avatar.Fallback
                        name={person.name}
                      />
                    </Avatar.Root>

                    <Text fontWeight="medium">
                      {person.name}
                    </Text>
                  </HStack>
                </Table.Cell>

                <Table.Cell>
                  {person.email}
                </Table.Cell>

                <Table.Cell>
                  <Badge
                    colorPalette={
                      person.ticket === "VIP"
                        ? "purple"
                        : "blue"
                    }
                    borderRadius="md"
                    px={2}
                    py={1}
                  >
                    {person.ticket}
                  </Badge>
                </Table.Cell>

                <Table.Cell>
                  {person.seats}
                </Table.Cell>

                <Table.Cell>
                  <Badge
                    colorPalette={
                      person.payment === "Paid"
                        ? "green"
                        : "orange"
                    }
                    borderRadius="md"
                    px={2}
                    py={1}
                  >
                    {person.payment}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        {filtered.length === 0 && (
          <Box
            py={10}
            textAlign="center"
          >
            <Text color="gray.500">
              No attendees found.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}