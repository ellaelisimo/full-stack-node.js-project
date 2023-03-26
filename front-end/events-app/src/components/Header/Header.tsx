import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <Grid
      margin="40px"
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      paddingBottom="10px"
      sx={{
        "& a": {
          color: "black",
          textDecoration: "none",
          fontSize: "18px",

          ":hover": { color: "grey" },
        },
      }}
    >
      <nav>
        <Box>
          <NavLink to={"/events"}>Events</NavLink>
        </Box>

        <Box>
          <NavLink to={"/users"}>Users</NavLink>
        </Box>

        <Box>
          <NavLink to={"/logout"}>Logout</NavLink>
        </Box>
      </nav>
    </Grid>
  );
};
