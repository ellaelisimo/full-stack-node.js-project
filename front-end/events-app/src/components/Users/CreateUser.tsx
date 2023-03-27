import { Button, Grid, Input, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
  const [user, setUser] = useState<any>({
    name: "",
    surname: "",
    email: "",
    dateOfBirth: "",
    age: "",
    event_ids: [],
  });
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/events", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  const handleChange = (e: any) => {
    let newUser = { ...user, [e.target.name]: e.target.value };

    if (e.target.name === "date_of_birth") {
      const age =
        new Date().getFullYear() - new Date(e.target.value).getFullYear();
      newUser = { ...newUser, age: age };
    }

    if (e.target.name === "events") {
      const event_ids = Array.from(e.target.selectedOptions).map(
        (option: any) => parseInt(option.value)
      );
      console.log(event_ids);

      delete newUser.events;
      newUser = { ...newUser, event_ids: event_ids };
    }

    setUser(newUser);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/users", user, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response); //
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box justifyContent="center" alignContent="center">
        <Typography
          variant="h1"
          component="h1"
          sx={{ textAlign: "center", margin: "1rem" }}
        >
          Create User
        </Typography>
        <Grid
          container
          display="flex"
          // textAlign="center"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="550px"
          width="250px"
          padding="30px"
          border="2px solid #90caf9"
          borderRadius="10px"
          boxShadow="5px 5px 5px #90caf9"
          marginLeft={{ xs: "0", md: "34rem" }}
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <Input
              sx={{ marginBottom: "10px" }}
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />

            <label htmlFor="surname">Surname</label>
            <Input
              sx={{ marginBottom: "10px" }}
              type="text"
              name="surname"
              value={user.surname}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <Input
              sx={{ marginBottom: "10px" }}
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />

            <label htmlFor="date_of_birth">Date of Birth</label>
            <Input
              sx={{ marginBottom: "10px" }}
              type="date"
              name="date_of_birth"
              value={user.date_of_birth}
              onChange={handleChange}
            />

            <label htmlFor="age">Age</label>
            <Input
              sx={{ marginBottom: "10px" }}
              type="number"
              name="age"
              value={user.age}
              readOnly
              onChange={handleChange}
            />

            <label htmlFor="events">Events</label>
            <select name="events" multiple onChange={handleChange}>
              {events &&
                events.map((event: any) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
            </select>

            <Button
              variant="contained"
              type="submit"
              size="small"
              sx={{ marginTop: "15px" }}
            >
              Create User
            </Button>
          </form>
        </Grid>
      </Box>
    </>
  );
};
