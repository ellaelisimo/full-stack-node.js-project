import { useEffect, useState } from "react";
import { EventCard } from "./EventCard";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
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
  }, [token]);

  return (
    <>
      <h1>Events</h1>
      {events.map((event: any) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  );
};
