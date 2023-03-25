import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>({});
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    fetch(`http://localhost:5000/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      });
  }, [id, isLoggedIn, token]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!event.id) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{event.name}</h1>
      <p>Id: {event.id}</p>
      <p>Starts: {event.date_starts}</p>
      <p>Ends: {event.date_ends}</p>
      <p>Participants: {event.participants.length}</p>
    </>
  );
};
