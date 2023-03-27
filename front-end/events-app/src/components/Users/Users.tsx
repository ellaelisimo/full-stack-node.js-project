import { Box, Button, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./User";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Typography
        variant="h1"
        component="h1"
        sx={{ textAlign: "center", margin: "1rem" }}
      >
        Users
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          flexWrap: "nowrap",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Button
          variant="contained"
          sx={{ margin: "1rem" }}
          onClick={() => {
            navigate("/users/create");
          }}
        >
          Create User
        </Button>
      </Box>

      <List
        sx={{
          maxWidth: "80%",
        }}
      >
        {users.map((user: any) => (
          <User key={user.id} user={user} />
        ))}
      </List>
    </>
  );
};
