import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d63a2f",
    },
    secondary: {
      main: "#f4c542",
    },
    background: {
      default: "#0b1a33",
      paper: "#102544",
    },
    text: {
      primary: "#f7f1e1",
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});

export default theme;
