import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  function handleExplore() {
    if (user) {
      navigate("/events");
    } else {
      navigate("/login", {
        state: {
          from: "/events",
        },
      });
    }
  }

  return (
    <div className="simple-home">

      <section className="simple-home-hero">

        <div className="simple-home-content">

          <span className="simple-home-label">
            EVENTIX
          </span>

          <h1>
            Your next
            <br />
            <span>experience</span>
            <br />
            starts here.
          </h1>

          <p>
            Discover concerts, festivals, workshops,
            sports events and unforgettable experiences
            all in one place.
          </p>

          <button
            className="simple-home-button"
            onClick={handleExplore}
          >
            Explore Events
            <FaArrowRight />
          </button>

        </div>

      </section>

    </div>
  );
}