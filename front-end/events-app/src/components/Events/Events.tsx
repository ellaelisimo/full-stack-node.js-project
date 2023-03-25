import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const Events = () => {
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => {
        setEvents(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {new Date(event.date_starts).toLocaleDateString()} to{" "}
            {new Date(event.date_ends).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
