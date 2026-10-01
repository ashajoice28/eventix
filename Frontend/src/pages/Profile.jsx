import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Separator,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Asha Joice",
    email: "asha@gmail.com",
    phone: "9876543210",
    city: "Trivandrum",
    bio: "Event enthusiast who loves music festivals and tech conferences.",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    console.log(profile);
    alert("Profile Updated Successfully!");
  };

  return (
    <Box bg="#F5F3FF" minH="100vh" p={8}>
      <Heading color="#2D1B69" mb={8}>
        My Profile
      </Heading>

      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr 2fr",
        }}
        gap={8}
      >
        {/* Left Card */}
        <Box
          bg="white"
          borderRadius="2xl"
          p={8}
          boxShadow="lg"
          textAlign="center"
        >
          <VStack gap={4}>
            <Avatar.Root
              size="2xl"
              bg="purple.500"
            >
              <Avatar.Fallback name={profile.name} />
            </Avatar.Root>

            <Heading size="md">
              {profile.name}
            </Heading>

            <Text color="gray.500">
              {profile.email}
            </Text>

            <Button
              colorPalette="purple"
              size="sm"
            >
              Change Photo
            </Button>
          </VStack>
        </Box>

        {/* Right Form */}
        <Box
          bg="white"
          borderRadius="2xl"
          p={8}
          boxShadow="lg"
        >
          <VStack gap={5}>
            <Flex
              w="100%"
              justify="space-between"
            >
              <Heading size="md">
                Personal Information
              </Heading>
            </Flex>

            <Separator width="100%" />

            <Input
              placeholder="Full Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />

            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />

            <Input
              placeholder="Phone Number"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />

            <Input
              placeholder="City"
              name="city"
              value={profile.city}
              onChange={handleChange}
            />

            <Textarea
              placeholder="Bio"
              rows={4}
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            />

            <Button
              colorPalette="purple"
              w="100%"
              size="lg"
              borderRadius="xl"
              onClick={handleUpdate}
            >
              Update Profile
            </Button>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}