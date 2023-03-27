import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Participant } from "../Participant";
import type { EventImage } from "./types";

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>({});
  const [eventImages, setEventImages] = useState<EventImage[]>([
    {
      id: 4,
      imageUrl:
        "https://cdn-az.allevents.in/events1/banners/aa6e43430ca1712e28d3c1fa63c855a9672cefa0f10abfc1749d5eff89341fa3-rimg-w960-h503-gmir.jpg?v=1678327970",
    },
    {
      id: 5,
      imageUrl:
        "https://www.vilnius-events.lt/wp-content/uploads/2023/03/CHORO-GO-Vilnius.png",
    },
    {
      id: 6,
      imageUrl:
        "https://www.vilnius-events.lt/wp-content/uploads/2022/11/kristupo-kaledos__.jpg",
    },
    {
      id: 7,
      imageUrl:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F467634059%2F417673854227%2F1%2Foriginal.20230313-155309?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=2562efe4def4d28e3a9b0fcd8d6b6130",
    },
    {
      id: 8,
      imageUrl:
        "https://cdn-az.allevents.in/events5/banners/b4383a35856a4bf0e4a8c0415c58e14d6f331601c73e53e09d71a6c081cd8ede-rimg-w1200-h676-gmir.jpg?v=1677830203",
    },
    {
      id: 9,
      imageUrl:
        "https://renginiai.kasvyksta.lt/uploads/events/104727/thumb/b1cdf13e.jpg",
    },
  ]);
  const token = localStorage.getItem("token");

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

  const eventImage = eventImages.find((img) => img.id === event.id);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Card>
          <CardMedia
            sx={{
              height: "250px",
              width: "800px",
              title: "Event Image",
              marginTop: "50px",
            }}
          >
            <source srcSet={eventImage?.imageUrl} />
            <img
              src={eventImage?.imageUrl}
              alt="Event Image"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </CardMedia>
          <CardContent
            sx={{
              marginTop: "250px",
            }}
          >
            <Typography variant="h2" color="green">
              {event.name}
            </Typography>

            <Typography variant="h3" fontSize="20px">
              Id: {event.id}
            </Typography>

            <Typography variant="h3" fontSize="20px">
              Date starts: {event.date_starts}
            </Typography>

            <Typography variant="h3" fontSize="20px">
              Date ends: {event.date_ends}
            </Typography>

            <Typography variant="h3" fontSize="20px" paddingTop="15px">
              Participants:
            </Typography>

            {event.participants.map((participant: any) => (
              <Box>
                <Participant key={participant.id} participant={participant} />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
