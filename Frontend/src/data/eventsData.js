const eventsData = [
  {
    id: 1,
    title: "Chennai Music Festival",
    category: "Music",
    location: "Chennai",
    date: "2026-10-10",
    time: "6:00 PM",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80",
    description:
      "Experience an unforgettable evening filled with live music, talented artists and amazing performances.",
  },

  {
    id: 2,
    title: "Tech Innovation Summit",
    category: "Technology",
    location: "Bangalore",
    date: "2026-10-15",
    time: "10:00 AM",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    description:
      "Explore the latest technology trends, startups, AI and innovative ideas.",
  },

  {
    id: 3,
    title: "Cultural Heritage Festival",
    category: "Cultural",
    location: "Madurai",
    date: "2026-10-20",
    time: "5:00 PM",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=80",
    description:
      "Celebrate traditional art, culture, music and heritage with artists from across Tamil Nadu.",
  },

  {
    id: 4,
    title: "Startup Business Conference",
    category: "Business",
    location: "Coimbatore",
    date: "2026-10-25",
    time: "9:30 AM",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
    description:
      "Meet entrepreneurs, investors and business leaders at this exciting startup conference.",
  },

  {
    id: 5,
    title: "Football Championship",
    category: "Sports",
    location: "Kochi",
    date: "2026-11-02",
    time: "4:00 PM",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=80",
    description:
      "Watch exciting football action featuring talented teams competing for the championship.",
  },

  {
    id: 6,
    title: "Digital Marketing Workshop",
    category: "Education",
    location: "Chennai",
    date: "2026-11-08",
    time: "10:00 AM",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
    description:
      "Learn practical digital marketing strategies, SEO, social media and online advertising.",
  },

  {
    id: 7,
    title: "Comedy Night Live",
    category: "Entertainment",
    location: "Bangalore",
    date: "2026-11-12",
    time: "7:00 PM",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1000&q=80",
    description:
      "Enjoy an evening of laughter with talented stand-up comedians and live entertainment.",
  },

  {
    id: 8,
    title: "Food & Culinary Expo",
    category: "Food",
    location: "Chennai",
    date: "2026-11-18",
    time: "11:00 AM",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
    description:
      "Discover delicious food, new flavours, cooking demonstrations and culinary experiences.",
  },

  {
    id: 9,
    title: "Photography Masterclass",
    category: "Workshop",
    location: "Kochi",
    date: "2026-11-22",
    time: "9:00 AM",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
    description:
      "Improve your photography skills with professional photographers and practical sessions.",
  },

  {
    id: 10,
    title: "New Year Music Carnival",
    category: "Music",
    location: "Chennai",
    date: "2026-12-31",
    time: "8:00 PM",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    description:
      "Celebrate the New Year with live performances, music, lights and an unforgettable night.",
  },

  {
    id: 11,
    title: "React Developer Meetup",
    category: "Technology",
    location: "Chennai",
    date: "2026-10-28",
    time: "2:00 PM",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    description:
      "Meet React developers, learn modern frontend development and connect with technology professionals.",
  },

  {
    id: 12,
    title: "College Cultural Fest",
    category: "Cultural",
    location: "Nagercoil",
    date: "2026-11-05",
    time: "4:30 PM",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    description:
      "Enjoy music, dance, cultural performances and exciting activities.",
  },

  {
    id: 13,
    title: "Business Leadership Summit",
    category: "Business",
    location: "Chennai",
    date: "2026-11-15",
    time: "10:00 AM",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80",
    description:
      "Learn leadership, entrepreneurship and business strategies from industry professionals.",
  },

  {
    id: 14,
    title: "Marathon Sports Event",
    category: "Sports",
    location: "Coimbatore",
    date: "2026-11-25",
    time: "6:00 AM",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80",
    description:
      "Take part in an exciting marathon and sports experience for fitness enthusiasts.",
  },

  {
    id: 15,
    title: "AI & Machine Learning Workshop",
    category: "Education",
    location: "Bangalore",
    date: "2026-12-05",
    time: "10:00 AM",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    description:
      "Learn the fundamentals of artificial intelligence and machine learning through practical sessions.",
  },
];

export default eventsData;