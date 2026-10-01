import { Box, Image, Text, Heading, Button, Badge } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <Box
      bg="gray.900"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="12px"
      overflow="hidden"
      transition="0.3s"
      _hover={{
        transform: "translateY(-6px)",
        borderColor: "#D4AF37",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      <Image
        src={event.image}
        alt={event.title}
        width="100%"
        height="220px"
        objectFit="cover"
      />

      <Box p={5}>
        <Badge
          mb={3}
          px={3}
          py={1}
          borderRadius="20px"
          bg="#D4AF37"
          color="black"
        >
          {event.category}
        </Badge>

        <Heading
          size="md"
          color="white"
          mb={3}
          minH="50px"
        >
          {event.title}
        </Heading>

        <Text color="gray.400" mb={2}>
          <FaCalendarAlt
            style={{ display: "inline", marginRight: "8px" }}
          />
          {event.date} • {event.time}
        </Text>

        <Text color="gray.400" mb={4}>
          <FaMapMarkerAlt
            style={{ display: "inline", marginRight: "8px" }}
          />
          {event.location}
        </Text>

        <Text
          color="#D4AF37"
          fontSize="xl"
          fontWeight="bold"
          mb={4}
        >
          ₹{event.price}
        </Text>

        <Button
          width="100%"
          bg="#D4AF37"
          color="black"
          _hover={{
            bg: "#B8962E",
          }}
          onClick={() => navigate(`/events/${event.id}`)}
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
}

export default EventCard;