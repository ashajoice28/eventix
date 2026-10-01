import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export default function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    category: "",
    venue: "",
    city: "",
    date: "",
    time: "",
    price: "",
    seats: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(event);
    alert("Event Created Successfully!");
  };

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
      >
        <Box>
          <Heading color="#2D1B69">
            Create Event
          </Heading>

          <Text color="gray.500" mt={2}>
            Create and publish a new event
          </Text>
        </Box>
      </Flex>

      {/* Form */}
      <Box
        bg="white"
        p={{ base: 5, md: 8 }}
        borderRadius="2xl"
        boxShadow="lg"
        maxW="1000px"
        mx="auto"
      >
        <VStack
          as="form"
          onSubmit={handleSubmit}
          gap={6}
          align="stretch"
        >
          <Heading size="md" color="#2D1B69">
            Event Information
          </Heading>

          <Input
            name="title"
            placeholder="Event Title"
            size="lg"
            value={event.title}
            onChange={handleChange}
            required
          />

          {/* Category */}
          <Box>
            <Text
              fontWeight="medium"
              mb={2}
            >
              Category
            </Text>

            <select
              name="category"
              value={event.category}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                height: "48px",
                padding: "0 16px",
                border: "1px solid #CBD5E0",
                borderRadius: "8px",
                fontSize: "16px",
                background: "white",
              }}
            >
              <option value="">
                Select Category
              </option>

              <option value="Music">
                Music
              </option>

              <option value="Technology">
                Technology
              </option>

              <option value="Festival">
                Festival
              </option>

              <option value="Sports">
                Sports
              </option>

              <option value="Workshop">
                Workshop
              </option>

              <option value="Business">
                Business
              </option>
            </select>
          </Box>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "1fr 1fr",
            }}
            gap={5}
          >
            <Input
              name="venue"
              placeholder="Venue"
              size="lg"
              value={event.venue}
              onChange={handleChange}
              required
            />

            <Input
              name="city"
              placeholder="City"
              size="lg"
              value={event.city}
              onChange={handleChange}
              required
            />

            <Box>
              <Text
                fontWeight="medium"
                mb={2}
              >
                Event Date
              </Text>

              <Input
                name="date"
                type="date"
                size="lg"
                value={event.date}
                onChange={handleChange}
                required
              />
            </Box>

            <Box>
              <Text
                fontWeight="medium"
                mb={2}
              >
                Event Time
              </Text>

              <Input
                name="time"
                type="time"
                size="lg"
                value={event.time}
                onChange={handleChange}
                required
              />
            </Box>

            <Input
              name="price"
              type="number"
              placeholder="Ticket Price (₹)"
              size="lg"
              min="0"
              value={event.price}
              onChange={handleChange}
              required
            />

            <Input
              name="seats"
              type="number"
              placeholder="Available Seats"
              size="lg"
              min="1"
              value={event.seats}
              onChange={handleChange}
              required
            />
          </Grid>

          <Input
            name="image"
            placeholder="Event Image URL"
            size="lg"
            value={event.image}
            onChange={handleChange}
          />

          {/* Image Preview */}
          {event.image && (
            <Box>
              <Text
                fontWeight="medium"
                mb={2}
              >
                Image Preview
              </Text>

              <Image
                src={event.image}
                alt="Event preview"
                w="100%"
                maxH="300px"
                objectFit="cover"
                borderRadius="xl"
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />
            </Box>
          )}

          <Box>
            <Text
              fontWeight="medium"
              mb={2}
            >
              Event Description
            </Text>

            <Textarea
              name="description"
              placeholder="Describe your event..."
              rows={6}
              value={event.description}
              onChange={handleChange}
              required
            />
          </Box>

          <Button
            type="submit"
            colorPalette="purple"
            size="lg"
            borderRadius="xl"
            w="100%"
          >
            Create Event
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}