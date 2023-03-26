import { Box, Grid, Typography } from "@mui/material";
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
      <Box>
        <Grid>
          <Typography variant="h1" fontSize="35px">
            Events
          </Typography>

          {events.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Grid>
      </Box>
    </>
  );
};
