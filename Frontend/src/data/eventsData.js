const eventsData = [
  {
    id: 1,
    title: "Rolling Loud India",
    category: "Music",
    location: "Mumbai, Maharashtra",
    date: "2026-10-25",
    time: "6:00 PM",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80",
    description:
      "Experience an unforgettable evening of live music, amazing artists and incredible performances.",
  },

  {
    id: 2,
    title: "Tech Innovation Summit",
    category: "Workshop",
    location: "Bangalore, Karnataka",
    date: "2026-11-02",
    time: "10:00 AM",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    description:
      "Explore the latest technology trends, startups, AI and innovative ideas.",
  },

  {
    id: 3,
    title: "Kerala Food Festival",
    category: "Festival",
    location: "Kochi, Kerala",
    date: "2026-11-08",
    time: "5:00 PM",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
    description:
      "Enjoy delicious Kerala cuisine, traditional flavours and an exciting food experience.",
  },

  {
    id: 4,
    title: "Football Championship",
    category: "Sports",
    location: "Chennai, Tamil Nadu",
    date: "2026-11-15",
    time: "4:00 PM",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=80",
    description:
      "Watch exciting football action featuring talented teams competing for the championship.",
  },

  {
    id: 5,
    title: "Startup Networking Meet",
    category: "Business",
    location: "Hyderabad, Telangana",
    date: "2026-11-20",
    time: "10:00 AM",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
    description:
      "Connect with entrepreneurs, startups, investors and business professionals.",
  },

  {
    id: 6,
    title: "College Cultural Fest",
    category: "Festival",
    location: "Trivandrum, Kerala",
    date: "2026-11-28",
    time: "4:30 PM",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    description:
      "Enjoy music, dance, cultural performances and exciting college activities.",
  },

  {
    id: 7,
    title: "Neon Music Festival",
    category: "Music",
    location: "Chennai, Tamil Nadu",
    date: "2026-12-05",
    time: "7:00 PM",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    description:
      "Enjoy an electrifying music festival featuring live performances and spectacular lights.",
  },

  {
    id: 8,
    title: "AI Technology Conference",
    category: "Workshop",
    location: "Bangalore, Karnataka",
    date: "2026-12-12",
    time: "10:00 AM",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    description:
      "Discover artificial intelligence, machine learning and the future of technology.",
  },

  {
    id: 9,
    title: "Kochi Marathon",
    category: "Sports",
    location: "Kochi, Kerala",
    date: "2026-12-20",
    time: "6:00 AM",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80",
    description:
      "Take part in an exciting marathon experience for fitness enthusiasts and sports lovers.",
  },

  {
    id: 10,
    title: "Christmas Carnival",
    category: "Festival",
    location: "Kochi, Kerala",
    date: "2026-12-24",
    time: "5:00 PM",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1000&q=80",
    description:
      "Celebrate Christmas with festive activities, entertainment, food and fun for everyone.",
  },

  {
    id: 11,
    title: "Digital Marketing Workshop",
    category: "Workshop",
    location: "Chennai, Tamil Nadu",
    date: "2027-01-08",
    time: "10:00 AM",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
    description:
      "Learn practical digital marketing strategies, SEO, social media and online advertising.",
  },

  {
    id: 12,
    title: "Indian Premier League Fan Fest",
    category: "Sports",
    location: "Mumbai, Maharashtra",
    date: "2027-01-15",
    time: "4:00 PM",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80",
    description:
      "Celebrate cricket with fans, exciting activities, entertainment and an unforgettable experience.",
  },

  {
    id: 13,
    title: "Indie Music Night",
    category: "Music",
    location: "Bangalore, Karnataka",
    date: "2027-01-22",
    time: "7:00 PM",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80",
    description:
      "Enjoy an intimate evening featuring talented independent musicians and live performances.",
  },

  {
    id: 14,
    title: "Startup India Expo",
    category: "Business",
    location: "Hyderabad, Telangana",
    date: "2027-01-30",
    time: "10:00 AM",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80",
    description:
      "Explore innovative startups, meet entrepreneurs and discover new business opportunities.",
  },

  {
    id: 15,
    title: "Photography Masterclass",
    category: "Workshop",
    location: "Trivandrum, Kerala",
    date: "2027-02-07",
    time: "9:00 AM",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
    description:
      "Improve your photography skills with professional photographers and practical sessions.",
  },

  {
    id: 16,
    title: "Spring Festival 2027",
    category: "Festival",
    location: "New Delhi",
    date: "2027-02-20",
    time: "5:00 PM",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=80",
    description:
      "Celebrate spring with music, cultural performances, food and exciting entertainment.",
  },
];

export default eventsData;