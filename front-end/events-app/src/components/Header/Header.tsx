import { AppBar, Button, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={NavLink} to="/events">
            Events
          </Button>

          <Button color="inherit" component={NavLink} to="/users">
            Users
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" component={NavLink} to="/logout">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
};
