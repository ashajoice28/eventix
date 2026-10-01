import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FaSearch, FaFilter } from "react-icons/fa";

import EventCard from "../components/EventCard";
import eventsData from "../data/eventsData";

function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  const categories = [
    ...new Set(eventsData.map((event) => event.category)),
  ];

  const locations = [
    ...new Set(eventsData.map((event) => event.location)),
  ];

  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        event.title.toLowerCase().includes(searchText) ||
        event.category.toLowerCase().includes(searchText) ||
        event.location.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "" || event.category === category;

      const matchesLocation =
        location === "" || event.location === location;

      const matchesPrice =
        price === "" ||
        (price === "under500" && event.price < 500) ||
        (price === "500-1000" &&
          event.price >= 500 &&
          event.price <= 1000) ||
        (price === "above1000" && event.price > 1000);

      const matchesDate =
        date === "" || event.date === date;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesPrice &&
        matchesDate
      );
    });
  }, [search, category, location, price, date]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setPrice("");
    setDate("");
  };

  return (
    <Box
      minH="100vh"
      bg="#050505"
      color="white"
      py={10}
    >
      <Container maxW="1400px">
        {/* PAGE TITLE */}

        <VStack
          align="start"
          spacing={3}
          mb={8}
        >
          <Text
            color="#D4AF37"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            Discover Events
          </Text>

          <Heading
            fontSize={{
              base: "3xl",
              md: "5xl",
            }}
          >
            Find Your Next Experience
          </Heading>

          <Text color="gray.400">
            Discover concerts, workshops, sports, festivals and
            unforgettable experiences.
          </Text>
        </VStack>

        {/* SEARCH */}

        <Flex
          bg="gray.900"
          p={4}
          borderRadius="12px"
          border="1px solid"
          borderColor="gray.700"
          gap={3}
          mb={6}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Flex
            align="center"
            flex="1"
            bg="gray.800"
            borderRadius="8px"
            px={4}
          >
            <FaSearch color="#D4AF37" />

            <Input
              ml={3}
              border="none"
              outline="none"
              _focus={{
                boxShadow: "none",
              }}
              placeholder="Search events, categories or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              color="white"
            />
          </Flex>

          <Button
            bg="#D4AF37"
            color="black"
            px={8}
            _hover={{
              bg: "#B8962E",
            }}
          >
            Search
          </Button>
        </Flex>

        {/* FILTER AREA */}

        <Box
          bg="gray.900"
          p={5}
          borderRadius="12px"
          border="1px solid"
          borderColor="gray.700"
          mb={10}
        >
          <Flex
            align="center"
            gap={2}
            mb={5}
          >
            <FaFilter color="#D4AF37" />

            <Heading size="md">
              Filter Events
            </Heading>
          </Flex>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {/* CATEGORY */}

            <Box>
              <Text
                color="gray.400"
                mb={2}
              >
                Category
              </Text>

              <Select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                bg="gray.800"
                borderColor="gray.700"
              >
                <option value="">
                  All Categories
                </option>

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </Select>
            </Box>

            {/* LOCATION */}

            <Box>
              <Text
                color="gray.400"
                mb={2}
              >
                Location
              </Text>

              <Select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                bg="gray.800"
                borderColor="gray.700"
              >
                <option value="">
                  All Locations
                </option>

                {locations.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </Select>
            </Box>

            {/* PRICE */}

            <Box>
              <Text
                color="gray.400"
                mb={2}
              >
                Price
              </Text>

              <Select
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                bg="gray.800"
                borderColor="gray.700"
              >
                <option value="">
                  All Prices
                </option>

                <option value="under500">
                  Under ₹500
                </option>

                <option value="500-1000">
                  ₹500 - ₹1000
                </option>

                <option value="above1000">
                  Above ₹1000
                </option>
              </Select>
            </Box>

            {/* DATE */}

            <Box>
              <Text
                color="gray.400"
                mb={2}
              >
                Date
              </Text>

              <Input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                bg="gray.800"
                borderColor="gray.700"
              />
            </Box>
          </Grid>

          <Button
            mt={5}
            variant="outline"
            borderColor="#D4AF37"
            color="#D4AF37"
            onClick={clearFilters}
            _hover={{
              bg: "#D4AF37",
              color: "black",
            }}
          >
            Clear Filters
          </Button>
        </Box>

        {/* RESULTS */}

        <Flex
          justify="space-between"
          align="center"
          mb={6}
        >
          <Heading size="lg">
            Available Events
          </Heading>

          <Text color="gray.400">
            {filteredEvents.length} event
            {filteredEvents.length !== 1
              ? "s"
              : ""}{" "}
            found
          </Text>
        </Flex>

        {/* EVENT GRID */}

        {filteredEvents.length > 0 ? (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={7}
          >
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </Grid>
        ) : (
          /* NO RESULTS */

          <Box
            textAlign="center"
            py={20}
            bg="gray.900"
            borderRadius="12px"
            border="1px solid"
            borderColor="gray.700"
          >
            <Heading
              size="lg"
              mb={3}
            >
              No Results Found
            </Heading>

            <Text color="gray.400" mb={6}>
              We couldn't find any events matching
              your search or filters.
            </Text>

            <Button
              bg="#D4AF37"
              color="black"
              onClick={clearFilters}
              _hover={{
                bg: "#B8962E",
              }}
            >
              Clear Search & Filters
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Events;