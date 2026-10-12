# Eventix — MERN event management and ticket booking

## Requirements
- Node.js 20.19+ recommended (required by the bundled Vite version)
- MongoDB local service or a MongoDB Atlas connection string
- Razorpay test account credentials for online payment testing

## 1. Backend setup

```bash
cd Backend
npm install
```

Copy `.env.example` to `.env`, then set:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/eventix
JWT_SECRET=use_a_long_random_secret_here
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
```

Start MongoDB, then run:

```bash
npm run dev
```

The API health check is `http://localhost:3000/`.

## 2. Frontend setup

Open another terminal:

```bash
cd Frontend
npm install
```

Copy `.env.example` to `.env` (the default API URL is `http://localhost:3000/api`), then run:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Main flow
1. Register as Attendee or Organizer. Registration is stored in MongoDB and returns a signed JWT.
2. Attendees are sent to My Bookings; organizers go to the organizer dashboard.
3. Organizers create events. Published events are saved in MongoDB and displayed in the attendee event listing (16 per page, with search and category filters).
4. Attendees choose an event and ticket quantity. Paid events open Razorpay Checkout; the backend verifies the payment signature before confirming the booking. Free events can be reserved without checkout.
5. My Bookings and organizer attendee lists read data from the database.

## Payment setup
Use Razorpay **test** keys in `Backend/.env`. The secret must never be put in the frontend `.env`. Without valid test keys, checkout intentionally returns a configuration error instead of pretending that payment succeeded. Switch to live keys only after account activation and your own testing.

## Data storage
MongoDB stores users (passwords hashed with bcrypt), events, bookings, payment references, and favorite event IDs. The browser's localStorage is used only for the JWT session and a non-authoritative user cache; it is not the source of truth for events, bookings, favorites, or payment state.
