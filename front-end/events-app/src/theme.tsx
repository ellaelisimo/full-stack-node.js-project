import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: 53,
    },
    h2: {
      fontSize: 40,
    },
    h3: {
      fontSize: 30,
    },
    h4: {
      fontSize: 25,
    },
    h5: {
      fontSize: 20,
    },
  },
  palette: {
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ab47bc",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
