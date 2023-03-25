import axios from "axios";
import { useState, useEffect } from "react";

export const Event = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${eventId}`)
      .then((res) => {
        setEvent(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [eventId]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.date_starts}</p>
      <p>{event.date_ends}</p>
      <img src="" alt="" />
    </div>
  );
};
