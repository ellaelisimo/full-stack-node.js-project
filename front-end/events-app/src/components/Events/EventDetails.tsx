import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Participant } from "../Participant";

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>({});
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

  return (
    <>
      <Card>
        <CardMedia
          sx={{
            height: "250px",
            width: "300px",
            title: "Naktinė naktis",
          }}
        >
          <source srcSet="https://cdn-az.allevents.in/events1/banners/aa6e43430ca1712e28d3c1fa63c855a9672cefa0f10abfc1749d5eff89341fa3-rimg-w960-h503-gmir.jpg?v=1678327970" />
          <img
            src="https://cdn-az.allevents.in/events1/banners/aa6e43430ca1712e28d3c1fa63c855a9672cefa0f10abfc1749d5eff89341fa3-rimg-w960-h503-gmir.jpg?v=1678327970"
            alt="Naktinė naktis"
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
          <Typography variant="h3" fontSize="35px">
            Id: {event.id}
          </Typography>
          <Typography variant="h3" fontSize="35px">
            Date starts: {event.date_starts}
          </Typography>
          <Typography variant="h3" fontSize="35px">
            Date ends: {event.date_ends}
          </Typography>
          <Typography variant="h3" fontSize="35px" paddingTop="15px">
            Participants:
          </Typography>

          {event.participants.map((participant: any) => (
            <Participant key={participant.id} participant={participant} />
          ))}
        </CardContent>
      </Card>
    </>
  );
};
