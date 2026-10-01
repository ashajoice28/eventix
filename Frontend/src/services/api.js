import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ---------- AUTH ----------
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// ---------- EVENTS ----------
export const getEvents = () =>
  API.get("/events");

export const getEventById = (id) =>
  API.get(`/events/${id}`);

export const createEvent = (data) =>
  API.post("/events", data);

export const updateEvent = (id, data) =>
  API.put(`/events/${id}`, data);

export const deleteEvent = (id) =>
  API.delete(`/events/${id}`);

// ---------- BOOKINGS ----------
export const createBooking = (data) =>
  API.post("/bookings", data);

export const getMyBookings = () =>
  API.get("/bookings/my");

export const cancelBooking = (id) =>
  API.delete(`/bookings/${id}`);

// ---------- USERS ----------
export const getProfile = () =>
  API.get("/users/profile");

export const updateProfile = (data) =>
  API.put("/users/profile", data);

// ---------- ADMIN ----------
export const getUsers = () =>
  API.get("/admin/users");

export const getReports = () =>
  API.get("/admin/reports");

export default API;