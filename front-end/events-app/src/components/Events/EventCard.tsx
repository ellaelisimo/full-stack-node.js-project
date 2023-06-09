import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const EventCard = (props: any) => {
  const { event } = props;
  const { id, name, date_starts, date_ends } = event;

  return (
    <div className="event-card">
      <h1>{name}</h1>
      <p>Id: {id}</p>
      <p>Starts: {date_starts}</p>
      <p>Ends: {date_ends}</p>

      <Button
        variant="contained"
        component={Link}
        to={`/events/${id}`}
        sx={{ width: "50px" }}
      >
        View
      </Button>
    </div>
  );
};
