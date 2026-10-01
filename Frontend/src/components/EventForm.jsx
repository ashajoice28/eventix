import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Text,
} from "@chakra-ui/react";

export default function EventForm() {
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
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(event);
    alert("Event Created Successfully!");
  };

  return (
    <Box
      maxW="900px"
      mx="auto"
      bg="white"
      p={8}
      borderRadius="2xl"
      boxShadow="xl"
    >
      <Heading mb={6} color="#2D1B69">
        Create New Event
      </Heading>

      <VStack spacing={5}>
        <Input
          placeholder="Event Title"
          name="title"
          value={event.title}
          onChange={handleChange}
        />

        <Grid templateColumns="repeat(2,1fr)" gap={4} w="100%">
          <Select
            placeholder="Select Category"
            name="category"
            value={event.category}
            onChange={handleChange}
          >
            <option>Music</option>
            <option>Technology</option>
            <option>Festival</option>
            <option>Sports</option>
            <option>Workshop</option>
          </Select>

          <Input
            placeholder="City"
            name="city"
            value={event.city}
            onChange={handleChange}
          />
        </Grid>

        <Input
          placeholder="Venue"
          name="venue"
          value={event.venue}
          onChange={handleChange}
        />

        <Grid templateColumns="repeat(2,1fr)" gap={4} w="100%">
          <Input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
          />

          <Input
            type="time"
            name="time"
            value={event.time}
            onChange={handleChange}
          />
        </Grid>

        <Grid templateColumns="repeat(2,1fr)" gap={4} w="100%">
          <Input
            type="number"
            placeholder="Ticket Price"
            name="price"
            value={event.price}
            onChange={handleChange}
          />

          <Input
            type="number"
            placeholder="Available Seats"
            name="seats"
            value={event.seats}
            onChange={handleChange}
          />
        </Grid>

        <Input
          placeholder="Banner Image URL"
          name="image"
          value={event.image}
          onChange={handleChange}
        />

        {event.image && (
          <Box w="100%">
            <Text mb={2} fontWeight="medium">
              Banner Preview
            </Text>
            <Box
              as="img"
              src={event.image}
              alt="Event Banner"
              w="100%"
              h="220px"
              objectFit="cover"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
            />
          </Box>
        )}

        <Textarea
          placeholder="Event Description"
          name="description"
          rows={5}
          value={event.description}
          onChange={handleChange}
        />

        <Button
          colorScheme="purple"
          w="100%"
          size="lg"
          borderRadius="xl"
          onClick={handleSubmit}
        >
          Create Event
        </Button>
      </VStack>
    </Box>
  );
}