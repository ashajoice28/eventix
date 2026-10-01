import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  Badge,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";

import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaTicketAlt,
  FaFire,
} from "react-icons/fa";


const eventsData = [
  {
    id: 1,
    title: "Rolling Loud India",
    category: "Music",
    date: "25 October 2026",
    time: "6:00 PM",
    location: "Mumbai, Maharashtra",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Tech Innovation Summit",
    category: "Workshop",
    date: "2 November 2026",
    time: "10:00 AM",
    location: "Bangalore, Karnataka",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Kerala Food Festival",
    category: "Festival",
    date: "8 November 2026",
    time: "5:00 PM",
    location: "Kochi, Kerala",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Football Championship",
    category: "Sports",
    date: "15 November 2026",
    time: "4:00 PM",
    location: "Chennai, Tamil Nadu",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "Startup Networking Meet",
    category: "Business",
    date: "20 November 2026",
    time: "11:00 AM",
    location: "Hyderabad, Telangana",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "College Cultural Fest",
    category: "Festival",
    date: "28 November 2026",
    time: "9:00 AM",
    location: "Trivandrum, Kerala",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
  },
];


function UserHome() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Music",
    "Sports",
    "Workshop",
    "Festival",
    "Business",
  ];


  /* =========================
     SEARCH
  ========================= */

  const handleSearch = () => {
    setSearch(searchInput.trim());
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  const handlePopularSearch = (value) => {
    setSearchInput(value);
    setSearch(value);
  };


  /* =========================
     FILTER EVENTS
  ========================= */

  const filteredEvents = eventsData.filter((event) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.category.toLowerCase().includes(searchText) ||
      event.location.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });


  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    setSelectedCategory("All");
  };


  return (
    <Box
      minH="100vh"
      bg="#090909"
      color="white"
    >

      {/* ==================================================
          HERO SECTION
      ================================================== */}

      <Box
        position="relative"
        overflow="hidden"
        bg="linear-gradient(135deg, #0a0a0a 0%, #17130a 50%, #0a0a0a 100%)"
        borderBottom="1px solid #242424"
      >

        {/* Decorative gold glow */}

        <Box
          position="absolute"
          width="400px"
          height="400px"
          borderRadius="50%"
          bg="#d4af37"
          opacity="0.05"
          filter="blur(100px)"
          top="-180px"
          right="-100px"
        />

        <Box
          position="absolute"
          width="300px"
          height="300px"
          borderRadius="50%"
          bg="#d4af37"
          opacity="0.04"
          filter="blur(100px)"
          bottom="-150px"
          left="-100px"
        />


        <Container
          maxW="1150px"
          py={{ base: 12, md: 20 }}
          position="relative"
        >

          {/* WELCOME */}

          <Box
            textAlign="center"
            maxW="850px"
            mx="auto"
          >

            <Text
              color="#d4af37"
              fontSize="sm"
              fontWeight="bold"
              letterSpacing="4px"
              mb={4}
            >
              WELCOME TO EVENTIX
            </Text>


            <Heading
              fontSize={{
                base: "3xl",
                sm: "4xl",
                md: "6xl",
              }}
              lineHeight="1.1"
              mb={5}
            >
              Discover experiences
              <br />

              <Text
                as="span"
                color="#d4af37"
              >
                worth remembering.
              </Text>
            </Heading>


            <Text
              color="gray.400"
              fontSize={{
                base: "sm",
                md: "lg",
              }}
              maxW="650px"
              mx="auto"
              lineHeight="1.7"
              mb={10}
            >
              Find concerts, festivals, workshops, sports
              and exciting events happening around you.
            </Text>


            {/* ==================================================
                ATTRACTIVE SEARCH BOX
            ================================================== */}

            <Box
              maxW="850px"
              mx="auto"
            >

              <Box
                bg="#151515"
                border="1px solid #3a3a3a"
                borderRadius="14px"
                p="7px"
                boxShadow="0 15px 45px rgba(0,0,0,0.45)"
                transition="all 0.2s ease"
                _hover={{
                  borderColor: "#d4af37",
                  boxShadow:
                    "0 15px 50px rgba(212,175,55,0.12)",
                }}
              >

                <Flex
                  direction={{
                    base: "column",
                    sm: "row",
                  }}
                  gap={2}
                >

                  {/* SEARCH INPUT */}

                  <Flex
                    flex="1"
                    align="center"
                    bg="#1e1e1e"
                    borderRadius="10px"
                    px={5}
                  >

                    <Box
                      color="#d4af37"
                      fontSize="18px"
                      mr={3}
                    >
                      <FaSearch />
                    </Box>

                    <Input
                      value={searchInput}
                      onChange={(e) =>
                        setSearchInput(e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                      placeholder="What are you looking for?"
                      border="none"
                      outline="none"
                      h="52px"
                      bg="transparent"
                      color="white"
                      fontSize={{
                        base: "sm",
                        md: "md",
                      }}
                      _placeholder={{
                        color: "gray.500",
                      }}
                      _focus={{
                        border: "none",
                        boxShadow: "none",
                      }}
                    />

                  </Flex>


                  {/* SEARCH BUTTON */}

                  <Button
                    h="52px"
                    px={{
                      base: 8,
                      md: 10,
                    }}
                    bg="#d4af37"
                    color="black"
                    borderRadius="10px"
                    fontWeight="bold"
                    fontSize="md"
                    onClick={handleSearch}
                    _hover={{
                      bg: "#f0c94d",
                      transform: "translateY(-1px)",
                    }}
                  >
                    <FaSearch
                      style={{
                        marginRight: "9px",
                      }}
                    />

                    Search
                  </Button>

                </Flex>

              </Box>


              {/* POPULAR SEARCHES */}

              <Flex
                justify="center"
                align="center"
                gap={3}
                mt={5}
                flexWrap="wrap"
              >

                <Flex
                  align="center"
                  color="gray.500"
                  fontSize="sm"
                >
                  <FaFire
                    style={{
                      marginRight: "6px",
                      color: "#d4af37",
                    }}
                  />

                  Popular:
                </Flex>


                {["Music", "Sports", "Festival", "Workshop"].map(
                  (item) => (
                    <Button
                      key={item}
                      size="xs"
                      variant="ghost"
                      color="gray.400"
                      borderRadius="20px"
                      onClick={() =>
                        handlePopularSearch(item)
                      }
                      _hover={{
                        color: "#d4af37",
                        bg: "#1b1b1b",
                      }}
                    >
                      {item}
                    </Button>
                  )
                )}

              </Flex>

            </Box>

          </Box>

        </Container>

      </Box>


      {/* ==================================================
          EVENTS
      ================================================== */}

      <Container
        maxW="1150px"
        py={{ base: 10, md: 14 }}
      >

        {/* HEADER */}

        <Flex
          justify="space-between"
          align={{
            base: "flex-start",
            md: "center",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
          gap={4}
          mb={8}
        >

          <Box>

            <Text
              color="#d4af37"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="2px"
              mb={2}
            >
              EXPLORE
            </Text>

            <Heading
              fontSize={{
                base: "2xl",
                md: "3xl",
              }}
            >
              Upcoming Events
            </Heading>

            <Text
              color="gray.500"
              mt={2}
            >
              Find something exciting to do.
            </Text>

          </Box>


          <Button
            variant="outline"
            borderColor="#d4af37"
            color="#d4af37"
            onClick={() => navigate("/events")}
            _hover={{
              bg: "#d4af37",
              color: "black",
            }}
          >
            View All
            <FaArrowRight
              style={{
                marginLeft: "9px",
              }}
            />
          </Button>

        </Flex>


        {/* CATEGORY BUTTONS */}

        <Flex
          gap={3}
          mb={9}
          flexWrap="wrap"
        >

          {categories.map((category) => (

            <Button
              key={category}
              size="sm"
              borderRadius="20px"
              border="1px solid"
              borderColor={
                selectedCategory === category
                  ? "#d4af37"
                  : "#303030"
              }
              bg={
                selectedCategory === category
                  ? "#d4af37"
                  : "#111111"
              }
              color={
                selectedCategory === category
                  ? "black"
                  : "gray.400"
              }
              px={5}
              onClick={() =>
                setSelectedCategory(category)
              }
              _hover={{
                borderColor: "#d4af37",
              }}
            >
              {category}
            </Button>

          ))}

        </Flex>


        {/* SEARCH RESULT */}

        {search && (

          <Flex
            align="center"
            justify="space-between"
            mb={6}
            bg="#141414"
            border="1px solid #292929"
            borderRadius="10px"
            px={5}
            py={3}
          >

            <Text
              color="gray.400"
              fontSize="sm"
            >
              Showing results for{" "}

              <Text
                as="span"
                color="#d4af37"
                fontWeight="bold"
              >
                "{search}"
              </Text>
            </Text>


            <Button
              size="xs"
              variant="ghost"
              color="#d4af37"
              onClick={clearSearch}
            >
              Clear
            </Button>

          </Flex>

        )}


        {/* ==================================================
            EVENT CARDS
        ================================================== */}

        {filteredEvents.length > 0 ? (

          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >

            {filteredEvents.map((event) => (

              <Box
                key={event.id}
                bg="#141414"
                border="1px solid #292929"
                borderRadius="14px"
                overflow="hidden"
                transition="all 0.25s ease"
                _hover={{
                  transform: "translateY(-5px)",
                  borderColor: "#d4af37",
                  boxShadow:
                    "0 15px 35px rgba(0,0,0,0.35)",
                }}
              >

                {/* IMAGE */}

                <Box
                  position="relative"
                  h="220px"
                >

                  <Image
                    src={event.image}
                    alt={event.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />


                  <Badge
                    position="absolute"
                    top={4}
                    left={4}
                    bg="#d4af37"
                    color="black"
                    borderRadius="20px"
                    px={3}
                    py={1}
                  >
                    {event.category}
                  </Badge>

                </Box>


                {/* CONTENT */}

                <Box p={5}>

                  <Heading
                    fontSize="xl"
                    mb={4}
                    noOfLines={1}
                  >
                    {event.title}
                  </Heading>


                  <VStack
                    align="stretch"
                    gap={3}
                    color="gray.400"
                    fontSize="sm"
                  >

                    <HStack>
                      <Box color="#d4af37">
                        <FaCalendarAlt />
                      </Box>

                      <Text>
                        {event.date}
                      </Text>
                    </HStack>


                    <HStack>
                      <Box color="#d4af37">
                        <FaMapMarkerAlt />
                      </Box>

                      <Text noOfLines={1}>
                        {event.location}
                      </Text>
                    </HStack>

                  </VStack>


                  {/* PRICE + DETAILS */}

                  <Flex
                    justify="space-between"
                    align="center"
                    mt={6}
                  >

                    <Box>

                      <Text
                        fontSize="xs"
                        color="gray.500"
                      >
                        From
                      </Text>

                      <Text
                        color="#d4af37"
                        fontSize="xl"
                        fontWeight="bold"
                      >
                        ₹{event.price}
                      </Text>

                    </Box>


                    <Button
                      size="sm"
                      bg="#d4af37"
                      color="black"
                      onClick={() =>
                        navigate(
                          `/events/${event.id}`
                        )
                      }
                      _hover={{
                        bg: "#f0c94d",
                      }}
                    >
                      Details
                    </Button>

                  </Flex>


                  {/* BOOK BUTTON */}

                  <Button
                    w="100%"
                    mt={4}
                    size="sm"
                    bg="transparent"
                    border="1px solid #333"
                    color="white"
                    onClick={() =>
                      navigate(
                        `/booking/${event.id}`
                      )
                    }
                    _hover={{
                      borderColor: "#d4af37",
                      color: "#d4af37",
                      bg: "#1b1b1b",
                    }}
                  >
                    <FaTicketAlt
                      style={{
                        marginRight: "8px",
                      }}
                    />

                    Book Now
                  </Button>

                </Box>

              </Box>

            ))}

          </Grid>

        ) : (

          /* NO EVENTS */

          <Box
            textAlign="center"
            py={20}
            bg="#141414"
            border="1px solid #292929"
            borderRadius="14px"
          >

            <Box
              color="#d4af37"
              fontSize="30px"
              mb={4}
            >
              <FaSearch
                style={{
                  margin: "0 auto",
                }}
              />
            </Box>


            <Heading
              fontSize="xl"
              mb={2}
            >
              No events found
            </Heading>


            <Text
              color="gray.500"
              mb={5}
            >
              Try searching for another event,
              category or location.
            </Text>


            <Button
              bg="#d4af37"
              color="black"
              onClick={clearSearch}
              _hover={{
                bg: "#f0c94d",
              }}
            >
              Clear Search
            </Button>

          </Box>

        )}

      </Container>

    </Box>
  );
}

export default UserHome;