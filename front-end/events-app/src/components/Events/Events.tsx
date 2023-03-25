import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { EventCard } from "./EventCard";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    fetch("http://localhost:5000/events", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      });
  }, [isLoggedIn, token]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1>Events</h1>
      {events.map((event: any) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  );
};
