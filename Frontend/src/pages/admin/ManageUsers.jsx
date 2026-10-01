import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  Badge,
  Avatar,
  Grid,
  Table,
} from "@chakra-ui/react";

import {
  FaEdit,
  FaTrash,
  FaUsers,
} from "react-icons/fa";

const initialUsers = [
  {
    id: 1,
    name: "Asha Joice",
    email: "asha@gmail.com",
    role: "Admin",
    city: "Trivandrum",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    role: "Organizer",
    city: "Chennai",
  },
  {
    id: 3,
    name: "Meera Nair",
    email: "meera@gmail.com",
    role: "Attendee",
    city: "Kochi",
  },
  {
    id: 4,
    name: "Arun Das",
    email: "arun@gmail.com",
    role: "Attendee",
    city: "Bangalore",
  },
];

export default function ManageUsers() {
  const [search, setSearch] = useState("");
  const [users] = useState(initialUsers);

  const filteredUsers = users.filter((user) =>
    user.name
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
            Manage Users
          </Heading>

          <Text color="gray.500">
            View and manage all Eventix users
          </Text>
        </Box>

        <Button colorPalette="purple">
          + Add User
        </Button>
      </Flex>

      {/* Statistics */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(3, 1fr)",
        }}
        gap={6}
        mb={8}
      >
        <Box
          bg="white"
          p={5}
          borderRadius="2xl"
          boxShadow="lg"
        >
          <HStack justify="space-between">
            <Box>
              <Text color="gray.500">
                Total Users
              </Text>

              <Heading>
                1,248
              </Heading>
            </Box>

            <Box
              bg="purple.500"
              p={3}
              borderRadius="xl"
              color="white"
            >
              <FaUsers size={24} />
            </Box>
          </HStack>
        </Box>

        <Box
          bg="white"
          p={5}
          borderRadius="2xl"
          boxShadow="lg"
        >
          <Text color="gray.500">
            Organizers
          </Text>

          <Heading color="blue.500">
            82
          </Heading>
        </Box>

        <Box
          bg="white"
          p={5}
          borderRadius="2xl"
          boxShadow="lg"
        >
          <Text color="gray.500">
            Attendees
          </Text>

          <Heading color="green.500">
            1,160
          </Heading>
        </Box>
      </Grid>

      {/* Search */}
      <Flex mb={6}>
        <Input
          placeholder="Search by name..."
          bg="white"
          borderRadius="xl"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </Flex>

      {/* Users Table */}
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
                User
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Email
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Role
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                City
              </Table.ColumnHeader>

              <Table.ColumnHeader textAlign="center">
                Action
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredUsers.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <HStack gap={3}>
                    <Avatar.Root
                      size="sm"
                      bg="purple.500"
                    >
                      <Avatar.Fallback
                        name={user.name}
                      />
                    </Avatar.Root>

                    <Text fontWeight="bold">
                      {user.name}
                    </Text>
                  </HStack>
                </Table.Cell>

                <Table.Cell>
                  {user.email}
                </Table.Cell>

                <Table.Cell>
                  <Badge
                    colorPalette={
                      user.role === "Admin"
                        ? "red"
                        : user.role === "Organizer"
                        ? "blue"
                        : "green"
                    }
                    px={3}
                    py={1}
                    borderRadius="md"
                  >
                    {user.role}
                  </Badge>
                </Table.Cell>

                <Table.Cell>
                  {user.city}
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