import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Participant } from "../Participant";

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>({});
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`http://localhost:5000/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      });
  }, [id, token]);

  if (!event.id) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{event.name}</h1>
      <p>Id: {event.id}</p>
      <p>Starts: {event.date_starts}</p>
      <p>Ends: {event.date_ends}</p>
      <h2>Participants:</h2>
      {event.participants.map((participant: any) => (
        <Participant key={participant.id} participant={participant} />
      ))}
    </>
  );
};
