import { Button, Grid, Input } from "@mui/material";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/login", { name: name, password: password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        const lastLocation = localStorage.getItem("redirect") || "/events";
        localStorage.removeItem("redirect");
        navigate(lastLocation);
      });
  };

  return (
    <>
      <Box
        role="login-form"
        textAlign="center"
        display="flex"
        justifyContent="center"
        marginTop="50px"
      >
        <Grid
          container
          display="flex"
          flexDirection="column"
          height="350px"
          width="250px"
          padding="20px"
          border="2px solid #90caf9"
          borderRadius="10px"
          boxShadow="5px 5px 5px #90caf9"
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="body1" fontSize="20px" padding="10px">
              Sign In
            </Typography>

            <Input value={name} onChange={handleChange} placeholder="Name" />

            <Input
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              type="password"
            />

            <Button
              variant="contained"
              type="submit"
              size="small"
              sx={{ marginTop: "15px" }}
            >
              Login
            </Button>
          </form>
        </Grid>
      </Box>
    </>
  );
};
